// need to add additional images in the future for now its fine to just have the main image for each product
const products = [
  {
    "id": "wide-legged-jeans",
    "name": "Wide Leg Blue Jeans",
    "description": "Wide-leg blue jeans with an easy, relaxed silhouette.",
    "details": [
      {
        "heading": "Fabric & Fit",
        "text": "Mid-weight denim with slight stretch. Features a high-rise waist, relaxed fit through the hip and thigh, five-pocket styling, and zip fly."
      },
      {
        "heading": "Care Instructions",
        "text": "Machine wash cold inside-out with like colors. Do not bleach. Tumble dry low or line dry. Warm iron if needed."
      },
      {
        "heading": "Shipping & Returns",
        "text": "Free standard shipping on orders over $50. Returns and exchanges accepted within 30 days of delivery."
      }
    ],
    "thumbnails": [
      "assets/products/wide-legged-jeans/wide-leg-black-jeans-side.png",
      "assets/products/wide-legged-jeans/wide-leg-black-jeans-back.png",
      "assets/products/wide-legged-jeans/wide-leg-black-jeans-detailed.png"
    ],
    "price": 89,
    "colors": ["Mid Blue", "Black", "White"],
    "sizes": ["XS", "S", "M", "L", "XL"],
    "image": "assets/products/wide-legged-jeans/wide-leg-blue-jeans.png",
    "imageHeight": 188,
    "colorImages": {
      "Mid Blue": "assets/products/wide-legged-jeans/wide-leg-blue-jeans.png",
      "Black": "assets/products/wide-legged-jeans/wide-leg-black-jeans.png",
      "White": "assets/products/wide-legged-jeans/wide-leg-white-jeans.png"
    },
    "collections": ["women", "new-arrivals"],
    "featuredOrder": 2,
    "badge": ""
  },
  {
    "id": "wool-quarter-zip",
    "name": "Wool Quarter Zip",
    "description": "A simple quarter-zip sweater for everyday layering.",
    "details": [
      {
        "heading": "Product information",
        "text": "Additional product details coming soon."
      }
    ],
    "thumbnails": [
      // "assets/products/wool-quarter-zip-side.png",
      // "assets/products/wool-quarter-zip-back.png",
      // "assets/products/wool-quarter-zip-detail.png",
      // "assets/products/wool-quarter-zip-alternate.png"
    ],
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
    "description": "A casual fleece sweater for comfortable everyday outfits.",
    "details": [
      {
        "heading": "Product information",
        "text": "Additional product details coming soon."
      }
    ],
    "thumbnails": [
      // "assets/products/fleece-sweater-side.png",
      // "assets/products/fleece-sweater-back.png",
      // "assets/products/fleece-sweater-detail.png",
      // "assets/products/fleece-sweater-alternate.png"
    ],
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
    "description": "Mid-length shorts with a simple, casual look.",
    "details": [
      {
        "heading": "Product information",
        "text": "Additional product details coming soon."
      }
    ],
    "thumbnails": [
      // "assets/products/casual-mid-shorts-side.png",
      // "assets/products/casual-mid-shorts-back.png",
      // "assets/products/casual-mid-shorts-detail.png",
      // "assets/products/casual-mid-shorts-alternate.png"
    ],
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
    "description": "Forest green slacks with a clean, relaxed silhouette.",
    "details": [
      {
        "heading": "Product information",
        "text": "Additional product details coming soon."
      }
    ],
    "thumbnails": [
      // "assets/products/wide-leg-capri-side.png",
      // "assets/products/wide-leg-capri-back.png",
      // "assets/products/wide-leg-capri-detail.png",
      // "assets/products/wide-leg-capri-alternate.png"
    ],
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
    "description": "White slacks with a straight-leg silhouette.",
    "details": [
      {
        "heading": "Product information",
        "text": "Additional product details coming soon."
      }
    ],
    "thumbnails": [
      // "assets/products/skinny-jeans-side.png",
      // "assets/products/skinny-jeans-back.png",
      // "assets/products/skinny-jeans-detail.png",
      // "assets/products/skinny-jeans-alternate.png"
    ],
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
    "description": "Crimson red jeans that bring color to everyday outfits.",
    "details": [
      {
        "heading": "Product information",
        "text": "Additional product details coming soon."
      }
    ],
    "thumbnails": [
      // "assets/products/crimson-red-jeans-side.png",
      // "assets/products/crimson-red-jeans-back.png",
      // "assets/products/crimson-red-jeans-detail.png",
      // "assets/products/crimson-red-jeans-alternate.png"
    ],
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
    "description": "Black jeans with a slim, skinny silhouette.",
    "details": [
      {
        "heading": "Product information",
        "text": "Additional product details coming soon."
      }
    ],
    "thumbnails": [
      // "assets/products/black-skinny-jeans-side.png",
      // "assets/products/black-skinny-jeans-back.png",
      // "assets/products/black-skinny-jeans-detail.png",
      // "assets/products/black-skinny-jeans-alternate.png"
    ],
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
    "description": "Wide-leg jeans with a weathered blue look.",
    "details": [
      {
        "heading": "Product information",
        "text": "Additional product details coming soon."
      }
    ],
    "thumbnails": [
      // "assets/products/weathered-wide-leg-jeans-side.png",
      // "assets/products/weathered-wide-leg-jeans-back.png",
      // "assets/products/weathered-wide-leg-jeans-detail.png",
      // "assets/products/weathered-wide-leg-jeans-alternate.png"
    ],
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
    "description": "Olive trousers with a cropped silhouette.",
    "details": [
      {
        "heading": "Product information",
        "text": "Additional product details coming soon."
      }
    ],
    "thumbnails": [
      // "assets/products/olive-cropped-trousers-side.png",
      // "assets/products/olive-cropped-trousers-back.png",
      // "assets/products/olive-cropped-trousers-detail.png",
      // "assets/products/olive-cropped-trousers-alternate.png"
    ],
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
    "description": "Red jeans with a slim-fit silhouette.",
    "details": [
      {
        "heading": "Product information",
        "text": "Additional product details coming soon."
      }
    ],
    "thumbnails": [
      // "assets/products/red-slim-fit-jeans-side.png",
      // "assets/products/red-slim-fit-jeans-back.png",
      // "assets/products/red-slim-fit-jeans-detail.png",
      // "assets/products/red-slim-fit-jeans-alternate.png"
    ],
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
    "description": "Blue jeans with a relaxed everyday silhouette.",
    "details": [
      {
        "heading": "Product information",
        "text": "Additional product details coming soon."
      }
    ],
    "thumbnails": [
      // "assets/products/relaxed-blue-jeans-side.png",
      // "assets/products/relaxed-blue-jeans-back.png",
      // "assets/products/relaxed-blue-jeans-detail.png",
      // "assets/products/relaxed-blue-jeans-alternate.png"
    ],
    "price": 89,
    "colors": ["Classic Blue", "Black", "White"],
    "sizes": ["XS", "S", "M", "L", "XL"],
    "image": "assets/products/relaxed-blue-jeans.jpg",
    "imageHeight": 188,
    "colorImages": {
      "Classic Blue": "assets/products/relaxed-blue-jeans.jpg",
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
