#!/bin/bash
# Deploy all SaaS products to Vercel
set -e

BASE=/Users/richardkamolvathin/saas-products
TGZ_DIR=/Users/richardkamolvathin/saas-deployment-packages
mkdir -p "$TGZ_DIR"

echo "Creating deployment packages for all 30 products..."
echo

# Count products
COUNT=0
for dir in "$BASE"/*/; do
    if [ -d "$dir" ] && [ -f "$dir/package.json" ] && [ -f "$dir/vercel.json" ]; then
        COUNT=$((COUNT + 1))
        NAME=$(basename "$dir")
        echo "[$COUNT] Packaging $NAME..."
        
        # Create a deployment tarball (excluding .git)
        cd "$dir"
        tar czf "$TGZ_DIR/$NAME.tar.gz" \
            --exclude=.git \
            --exclude=node_modules \
            --exclude=.next \
            .
    fi
done

echo
echo "Packaged $COUNT products into $TGZ_DIR"
echo

# Create a deployment helper script for each product
mkdir -p "$TGZ_DIR/deploy-scripts"

for dir in "$BASE"/*/; do
    if [ -d "$dir" ] && [ -f "$dir/package.json" ]; then
        NAME=$(basename "$dir")
        
        cat > "$TGZ_DIR/deploy-scripts/deploy-$NAME.sh" << SCRIPTEOF
#!/bin/bash
# Deploy $NAME to Vercel
set -e
TMP_DIR=\$(mktemp -d)
tar xzf "$TGZ_DIR/$NAME.tar.gz" -C "\$TMP_DIR"
cd "\$TMP_DIR"
echo "Deploying $NAME to Vercel..."
npx vercel --prod --yes --name "$NAME" 2>&1
echo "Done deploying $NAME"
rm -rf "\$TMP_DIR"
SCRIPTEOF
        chmod +x "$TGZ_DIR/deploy-scripts/deploy-$NAME.sh"
    fi
done

echo "Created $COUNT deployment scripts in $TGZ_DIR/deploy-scripts/"
echo
echo "To deploy all products, run:"
echo "  cd $TGZ_DIR/deploy-scripts && for f in deploy-*.sh; do bash \"\$f\"; done"
echo
echo "Or deploy individually:"
for f in "$TGZ_DIR"/deploy-scripts/deploy-*.sh; do
    NAME=$(basename "$f" .sh | sed 's/deploy-//')
    echo "  bash $f   # $NAME"
done
