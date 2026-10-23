// Shared catalog. Sizes and extra colors are prototype options, not live inventory.
// Add image paths to colorImages as photos become available; blank paths show a placeholder.
// Paths are relative to the root HTML pages. Some Figma cards reuse the same source photo.
const products = [
  {
    "id": "wide-legged-jeans",
    "name": "Wide Leg Blue Jeans",
    "price": 89,
    "colors": ["Mid Blue", "Black", "White"],
    "sizes": ["XS", "S", "M", "L", "XL"],
    "image": "assets/products/wide-leg-blue-jeans.png",
    "imageHeight": 188,
    "colorImages": {
      "Mid Blue": "assets/products/wide-leg-blue-jeans.png",
      "Black": "",
      "White": ""
    },
    "collections": ["women", "new-arrivals"],
    "featuredOrder": 2,
    "badge": ""
  },
  {
    "id": "wool-quarter-zip",
    "name": "Wool Quarter Zip",
    "price": 120,
    "colors": ["Ivory", "Black", "Grey"],
    "sizes": ["XS", "S", "M", "L", "XL"],
    "image": "assets/products/wool-quarter-zip.png",
    "imageHeight": 173.328,
    "colorImages": {
      "Ivory": "assets/products/wool-quarter-zip.png",
      "Black": "",
      "Grey": ""
    },
    "collections": []
  },
  {
    "id": "fleece-sweater",
    "name": "Fleece Sweater",
    "price": 75,
    "colors": ["Grey", "Black", "Ivory"],
    "sizes": ["XS", "S", "M", "L", "XL"],
    "image": "assets/products/fleece-sweater.png",
    "imageHeight": 152.156,
    "colorImages": {
      "Grey": "assets/products/fleece-sweater.png",
      "Black": "",
      "Ivory": ""
    },
    "collections": []
  },
  {
    "id": "casual-mid-shorts",
    "name": "Casual Mid-shorts",
    "price": 55,
    "colors": ["Black", "Beige", "White"],
    "sizes": ["XS", "S", "M", "L", "XL"],
    "image": "assets/products/casual-mid-shorts.png",
    "imageHeight": 173.328,
    "colorImages": {
      "Black": "assets/products/casual-mid-shorts.png",
      "Beige": "",
      "White": ""
    },
    "collections": []
  },
  {
    "id": "wide-leg-capri",
    "name": "Forest Green Slacks",
    "price": 68,
    "colors": ["Forest Green", "Black", "Ivory"],
    "sizes": ["XS", "S", "M", "L", "XL"],
    "image": "assets/products/forest-green-slacks.png",
    "imageHeight": 188,
    "colorImages": {
      "Forest Green": "assets/products/forest-green-slacks.png",
      "Black": "",
      "Ivory": ""
    },
    "collections": ["women", "new-arrivals"],
    "featuredOrder": 0,
    "badge": "New"
  },
  {
    "id": "skinny-jeans",
    "name": "White Straight-Leg Slacks",
    "price": 72,
    "colors": ["Optic White", "Black", "Beige"],
    "sizes": ["XS", "S", "M", "L", "XL"],
    "image": "assets/products/white-straight-leg-slacks.png",
    "imageHeight": 188,
    "colorImages": {
      "Optic White": "assets/products/white-straight-leg-slacks.png",
      "Black": "",
      "Beige": ""
    },
    "collections": ["women", "new-arrivals"],
    "featuredOrder": 4,
    "badge": ""
  },
  {
    "id": "crimson-red-jeans",
    "name": "Crimson Red Jeans",
    "price": 69,
    "colors": ["Crimson", "Black", "White"],
    "sizes": ["XS", "S", "M", "L", "XL"],
    "image": "assets/products/crimson-red-jeans.png",
    "imageHeight": 188,
    "colorImages": {
      "Crimson": "assets/products/crimson-red-jeans.png",
      "Black": "",
      "White": ""
    },
    "collections": ["women", "new-arrivals"],
    "featuredOrder": 1,
    "badge": "Limited"
  },
  {
    "id": "black-skinny-jeans",
    "name": "Black Skinny Jeans",
    "price": 55,
    "colors": ["Washed Black", "Blue", "White"],
    "sizes": ["XS", "S", "M", "L", "XL"],
    "image": "assets/products/black-skinny-jeans.png",
    "imageHeight": 188,
    "colorImages": {
      "Washed Black": "assets/products/black-skinny-jeans.png",
      "Blue": "",
      "White": ""
    },
    "collections": ["women", "new-arrivals"],
    "featuredOrder": 3,
    "badge": ""
  },
  {
    "id": "weathered-wide-leg-jeans",
    "name": "Weathered Wide-Leg Jeans",
    "price": 89.9,
    "colors": ["Vintage Blue", "Black", "Light Blue"],
    "sizes": ["XS", "S", "M", "L", "XL"],
    "image": "assets/products/weathered-wide-leg-jeans.png",
    "imageHeight": 188,
    "colorImages": {
      "Vintage Blue": "assets/products/weathered-wide-leg-jeans.png",
      "Black": "",
      "Light Blue": ""
    },
    "collections": ["women", "new-arrivals"],
    "featuredOrder": 5,
    "badge": "Trending"
  },
  {
    "id": "olive-cropped-trousers",
    "name": "Olive Cropped Trousers",
    "price": 68,
    "colors": ["Deep Olive", "Black", "Beige"],
    "sizes": ["XS", "S", "M", "L", "XL"],
    "image": "assets/products/forest-green-slacks.png",
    "imageHeight": 188,
    "colorImages": {
      "Deep Olive": "assets/products/forest-green-slacks.png",
      "Black": "",
      "Beige": ""
    },
    "collections": ["women", "new-arrivals"],
    "featuredOrder": 6,
    "badge": ""
  },
  {
    "id": "red-slim-fit-jeans",
    "name": "Red Slim-Fit Jeans",
    "price": 69,
    "colors": ["Ruby Red", "Black", "Blue"],
    "sizes": ["XS", "S", "M", "L", "XL"],
    "image": "assets/products/crimson-red-jeans.png",
    "imageHeight": 188,
    "colorImages": {
      "Ruby Red": "assets/products/crimson-red-jeans.png",
      "Black": "",
      "Blue": ""
    },
    "collections": ["women", "new-arrivals"],
    "featuredOrder": 7,
    "badge": ""
  },
  {
    "id": "relaxed-blue-jeans",
    "name": "Relaxed Blue Jeans",
    "price": 89,
    "colors": ["Classic Blue", "Black", "White"],
    "sizes": ["XS", "S", "M", "L", "XL"],
    "image": "assets/products/wide-leg-blue-jeans.png",
    "imageHeight": 188,
    "colorImages": {
      "Classic Blue": "assets/products/wide-leg-blue-jeans.png",
      "Black": "",
      "White": ""
    },
    "collections": ["women", "new-arrivals"],
    "featuredOrder": 8,
    "badge": "New"
  }
];

function getProductImage(product, color = product.colors[0]) {
  return product.colorImages?.[color] ?? (color === product.colors[0] ? product.image : '');
}
