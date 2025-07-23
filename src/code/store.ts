import { Data, Override, createStore } from "framer"

// Store for managing global state
export const store = createStore({
    cart: [],
    user: null,
    currentPage: "home",
    products: [
        {
            id: 1,
            name: "F1 Racing Jacket",
            price: 299,
            image: "/images/jacket.jpg",
            category: "outerwear"
        },
        {
            id: 2,
            name: "Speed Demon Hoodie",
            price: 149,
            image: "/images/hoodie.jpg",
            category: "hoodies"
        },
        {
            id: 3,
            name: "Circuit Tee",
            price: 79,
            image: "/images/tee.jpg",
            category: "tshirts"
        }
    ]
})

// Navigation override
export const Navigation: Override = () => {
    return {
        onTap: (page: string) => {
            store.currentPage = page
        }
    }
}

// Cart functionality
export const addToCart: Override = () => {
    return {
        onTap: (product: any) => {
            store.cart = [...store.cart, product]
        }
    }
}
