# Responsive Web Design Ingredients

## 1 FLuid layout

- To allow webpage to adapt to the current viewport width or height
- We Use % (or vh/vw) unit instead of the px for elements, that wil adapt to viewport (usually layout)
- Use max-width instead of width

## 2 Responsive units

- Use rem unit instead of px for most lengths
- To make it easy to scale the entire layout down or up automatically
- Helpful trick: setting 1 rem to 10px for easy calculation

## 3 Flexible Images

- By default, images don't scale automatically as we change the viewport, so we need to fix that
- Always use % for image dimensions, together with max-width

## 4 Media Queries

- Bring responsive site to life
- To change CSS styles on certain viewport widths (called breakpoints)

# The two Strategies to build sites with CSS

- The desktop first approach:
  - Which we optimize our interface for large screens, and therefore, we start writing CSS code for these large screens into our main CSS file, then later when we want to make it responsive we simply write queries.
- The Mobile-first approach:
  - Where we start writing CSS code for smaller screens, to optimize our website for mobile small screens

# Tints & Shades generator

- search for: tints & shades
- Then we get the darker and the lighter versions of our primary color
