app.component('product-display', {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  template:
    /*html*/
    `
   <div class="product-display">
        
    <div class="product-container">
      <div class="product-image">
        <img :src="image" />
      </div>
      <div class="product-info">
        <h1>{{ productName }}</h1>
        <p class="instock" v-if="inStock">In Stock</p>
        <p class="instock" v-else>Out of Stock</p>
        <p>Shipping: {{ shipping }}</p>
        <p>Available in below sizes:</p>
        <ul>
          <li v-for="detail in details">{{ detail }}</li>
        </ul>
        <div class="color-circle"
          v-for="(variant, index) in variants" 
          :key="variant.id"
          :style="{ backgroundColor: variant.color }"
          @mouseover="updateProduct(index)"
          >
        </div> 
        <button class="button" v-on:click="addToCart" 
          :disabled="!inStock"
          :class="{ disabledButton: !inStock }"
          >
        Add to cart
        </button>
      </div>
    </div>
    <review-list :reviews="reviews"></review-list>
    <review-form @review-submitted="addReview" ></review-form>
  </div>
   `,
  data() {
    return {
      product: 'Shoes',
      brand: 'Star',
      selectedVariant: 0,
      details: ['US 4', 'US 5', 'US 6'],
      variants: [
        {
          id: 2234,
          color: 'khaki',
          image: './assets/images/shoe.jpg',
          quantity: 10
        },
        {
          id: 2235,
          color: '#AFB6BD',
          image: './assets/images/shoe2.jpg',
          quantity: 0
        },
        {
          id: 3235,
          color: 'black',
          image: './assets/images/shoe3.jpg',
          quantity: 0
        },
        {
          id: 1235,
          color: '#445445',
          image: './assets/images/shoe4.jpg',
          quantity: 23
        }
      ],
      reviews: [],
      tabs: ['review-form', 'review-list'],
      activeTab: 'review-form'
    }
  },
  methods: {
    addToCart() {
      this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
    },
    updateProduct(index) {
      this.selectedVariant = index
    },
    addReview(review) {
      this.reviews.push(review)
    }
  },
  computed: {
    productName() {
      return this.brand + ' ' + this.product
    },
    image() {
      return this.variants[this.selectedVariant].image
    },
    inStock() {
      return this.variants[this.selectedVariant].quantity
    },
    shipping() {
      if (this.premium) {
        return 'Free'
      }
      return 2.99
    }
  }
})
