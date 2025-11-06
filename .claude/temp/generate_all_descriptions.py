#!/usr/bin/env python3
"""
Automate mockup description generation for all 892 blocks using Anthropic API with vision.

Reads screenshot-results.json for block inventory, processes images, generates descriptions
following strict layout-only rules, and saves progress every 10 blocks.
"""

import json
import os
import sys
import time
import base64
from pathlib import Path
from datetime import datetime

# Requires: pip install anthropic python-dotenv
try:
    import anthropic
    from dotenv import load_dotenv
except ImportError as e:
    print(f"ERROR: Required package not installed: {e}")
    print("Install with: pip install anthropic python-dotenv")
    sys.exit(1)

# Load environment variables from .env file
load_dotenv()


# Configuration
BASE_IMAGE_PATH = Path('.claude/skills/shadcn-ui-blocks/images')
SCREENSHOT_RESULTS_FILE = '.claude/temp/screenshot-results.json'
MOCKUP_DESCRIPTIONS_FILE = '.claude/temp/block-descriptions-mockup.json'
PROGRESS_FILE = '.claude/temp/block-descriptions-mockup-progress.json'
SAVE_INTERVAL = 10

DESCRIPTION_PROMPT = """Analyze this UI block screenshot and generate a concise mockup description.

RULES:
- 2-4 sentences max
- Describe layout structure only (columns, positioning)
- Use generic terms: "a heading", "body text", "a button", "a label"
- For images, just say "a image" - never describe content
- Use position words: "centered", "on the left", "horizontally", "vertically"
- NO: colors, use cases, specific image content

Example: "A webpage section displays content in two columns. The left column contains a main heading, a smaller title, a brief body text, and a single-word tag. To the right of this text, a large image spans the right column."

Generate description for the block screenshot below:"""


def load_json(filepath):
    """Safely load JSON file."""
    if not Path(filepath).exists():
        return {} if 'descriptions' in filepath or 'progress' in filepath else []

    try:
        with open(filepath, 'r') as f:
            return json.load(f)
    except json.JSONDecodeError:
        return {} if 'descriptions' in filepath or 'progress' in filepath else []


def save_json(filepath, data, backup=True):
    """Save JSON file with optional backup."""
    if backup and Path(filepath).exists():
        backup_path = f"{filepath}.backup-{datetime.now().strftime('%Y%m%d-%H%M%S')}"
        import shutil
        shutil.copy(filepath, backup_path)

    with open(filepath, 'w') as f:
        json.dump(data, f, indent=2)


def load_image_as_base64(image_path):
    """Load image and convert to base64."""
    try:
        with open(image_path, 'rb') as f:
            return base64.standard_b64encode(f.read()).decode('utf-8')
    except Exception as e:
        print(f"Error loading image {image_path}: {e}")
        return None


def generate_description(client, image_path, block_id):
    """Use Anthropic API with vision to generate description."""
    try:
        image_data = load_image_as_base64(image_path)
        if not image_data:
            return None

        message = client.messages.create(
            model="claude-haiku-4-5",
            max_tokens=300,
            messages=[
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "image",
                            "source": {
                                "type": "base64",
                                "media_type": "image/png",
                                "data": image_data,
                            },
                        },
                        {
                            "type": "text",
                            "text": DESCRIPTION_PROMPT
                        }
                    ],
                }
            ],
        )

        return message.content[0].text.strip()

    except anthropic.APIError as e:
        print(f"API error for {block_id}: {e}")
        return None
    except Exception as e:
        print(f"Unexpected error for {block_id}: {e}")
        return None


def main():
    """Main orchestration function."""
    # Check API key
    if not os.getenv('ANTHROPIC_API_KEY'):
        print("ERROR: ANTHROPIC_API_KEY environment variable not set")
        sys.exit(1)

    # Initialize client
    client = anthropic.Anthropic()

    # Load data
    print("Loading data...")
    screenshot_results = load_json(SCREENSHOT_RESULTS_FILE)
    descriptions = load_json(MOCKUP_DESCRIPTIONS_FILE)
    progress = load_json(PROGRESS_FILE)

    if not screenshot_results:
        print(f"ERROR: Could not load {SCREENSHOT_RESULTS_FILE}")
        sys.exit(1)

    # Build block list
    blocks_to_process = []
    for category in sorted(screenshot_results.get('categories', {}).keys()):
        for block in sorted(screenshot_results['categories'][category]):
            blocks_to_process.append({
                'category': category,
                'block': block,
                'id': block,
                'path': BASE_IMAGE_PATH / category / f"{block}.png"
            })

    total_blocks = len(blocks_to_process)
    already_described = sum(1 for d in descriptions.values() if isinstance(d, str) and d.strip())

    print(f"\n{'='*60}")
    print(f"Block Description Generation - Anthropic Vision API")
    print(f"{'='*60}")
    print(f"Total blocks: {total_blocks}")
    print(f"Already described: {already_described}")
    print(f"To process: {total_blocks - already_described}")
    print(f"Progress: {already_described}/{total_blocks} ({100*already_described/total_blocks:.1f}%)")
    print(f"{'='*60}\n")

    # Track stats
    processed_count = 0
    failed_blocks = progress.get('failed_blocks', [])
    skipped_blocks = progress.get('skipped_blocks', [])
    start_time = time.time()

    # Process blocks
    for idx, block_info in enumerate(blocks_to_process, 1):
        block_id = block_info['id']

        # Skip if already described (has non-empty description)
        if block_id in descriptions and descriptions[block_id].strip():
            skipped_blocks.append(block_id)
            continue

        # Skip if previously failed (can retry with --retry flag)
        if block_id in failed_blocks:
            continue

        image_path = block_info['path']

        # Check image exists
        if not image_path.exists():
            print(f"[{idx}/{total_blocks}] SKIP {block_id}: Image not found")
            skipped_blocks.append(block_id)
            continue

        # Generate description
        print(f"[{idx}/{total_blocks}] Processing {block_id}...", end=' ', flush=True)
        description = generate_description(client, str(image_path), block_id)

        if description:
            descriptions[block_id] = description
            processed_count += 1
            print(f"✓")
        else:
            print(f"✗ (API error)")
            failed_blocks.append(block_id)

        # Save progress every N blocks
        if processed_count % SAVE_INTERVAL == 0:
            progress.update({
                'last_block': block_id,
                'processed_count': processed_count,
                'failed_blocks': failed_blocks,
                'skipped_blocks': skipped_blocks,
                'timestamp': datetime.now().isoformat()
            })
            save_json(MOCKUP_DESCRIPTIONS_FILE, descriptions, backup=False)
            save_json(PROGRESS_FILE, progress, backup=False)
            elapsed = time.time() - start_time
            rate = processed_count / elapsed if elapsed > 0 else 0
            remaining = total_blocks - already_described - processed_count
            eta_seconds = remaining / rate if rate > 0 else 0
            eta_minutes = eta_seconds / 60
            print(f"  [Progress saved] Rate: {rate:.2f} blocks/sec | ETA: {eta_minutes:.0f} min")

    # Final save
    progress.update({
        'completed': True,
        'processed_count': processed_count,
        'failed_blocks': failed_blocks,
        'skipped_blocks': skipped_blocks,
        'timestamp': datetime.now().isoformat(),
        'total_time_seconds': time.time() - start_time
    })
    save_json(MOCKUP_DESCRIPTIONS_FILE, descriptions, backup=False)
    save_json(PROGRESS_FILE, progress, backup=False)

    # Summary
    total_time = time.time() - start_time
    print(f"\n{'='*60}")
    print(f"GENERATION COMPLETE")
    print(f"{'='*60}")
    print(f"New descriptions: {processed_count}")
    print(f"Failed blocks: {len(failed_blocks)}")
    print(f"Skipped/Already done: {len(skipped_blocks)}")
    print(f"Total described: {len(descriptions)}/{total_blocks}")
    print(f"Time elapsed: {total_time/60:.1f} minutes")
    if processed_count > 0:
        print(f"Rate: {processed_count/(total_time/3600):.1f} blocks/hour")
    print(f"{'='*60}\n")

    if failed_blocks:
        print(f"Failed blocks (can retry):")
        for block_id in failed_blocks[:10]:
            print(f"  - {block_id}")
        if len(failed_blocks) > 10:
            print(f"  ... and {len(failed_blocks) - 10} more")

    print(f"\nDescriptions saved to: {MOCKUP_DESCRIPTIONS_FILE}")
    print(f"Progress saved to: {PROGRESS_FILE}")


if __name__ == '__main__':
    main()
