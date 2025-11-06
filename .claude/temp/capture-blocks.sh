#!/bin/bash

# Categories and counts
declare -A categories=(
  ["about"]=16 ["awards"]=4 ["banner"]=7 ["blog"]=22 ["blogpost"]=6 ["careers"]=9
  ["casestudies"]=5 ["casestudy"]=3 ["changelog"]=7 ["codeexample"]=5 ["community"]=7
  ["compare"]=10 ["compliance"]=3 ["contact"]=17 ["content"]=4 ["cta"]=25 ["download"]=11
  ["experience"]=4 ["faq"]=16 ["feature"]=265 ["footer"]=21 ["gallery"]=33 ["hero"]=166
  ["integration"]=13 ["list"]=3 ["login"]=7 ["logos"]=12 ["navbar"]=16 ["pricing"]=35
  ["process"]=3 ["project"]=32 ["projects"]=24 ["ratecard"]=2 ["resource"]=2 ["resources"]=4
  ["service"]=7 ["services"]=18 ["signup"]=10 ["skills"]=2 ["stats"]=18 ["team"]=12
  ["testimonial"]=28 ["timeline"]=14 ["waitlist"]=1
)

success=0
failed=0
total=0
start_time=$(date +%s)

# Log file
log_file=".claude/temp/screenshot-log.txt"
echo "Screenshot capture started at $(date)" > "$log_file"

for category in "${!categories[@]}"; do
  count=${categories[$category]}
  for ((i=1; i<=count; i++)); do
    total=$((total + 1))
    block="${category}${i}"
    url="https://www.shadcnblocks.com/preview/${block}"

    echo "[$total/959] Capturing $block..."

    # This would need to be integrated with MCP calls
    # For now, just log the URLs we need to capture
    echo "$url" >> "$log_file"

    # Progress update every 50 blocks
    if [ $((total % 50)) -eq 0 ]; then
      elapsed=$(($(date +%s) - start_time))
      echo "Progress: $total/959 blocks listed (${elapsed}s)"
    fi
  done
done

echo -e "\nTotal URLs to capture: $total" | tee -a "$log_file"
