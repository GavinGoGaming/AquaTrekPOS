export interface Product {
    name: string | string[]; // string[] will be rendered "name1 / name2 / name3 / ..."
    price: number;
    imagePath: string; // relative to /product/
    subtext: string;
}

export const products: Product[] = [
    // Light Pink
    { name: ["Trek", "Light Pink"], price: 104.99, subtext: "30oz + Straw Support", imagePath: "pink.png" },
    { name: ["Lite", "Light Pink"], price: 64.99, subtext: "24oz + Hydration Tracking", imagePath: "pink.png" },

    // Creamy White
    { name: ["Trek", "Creamy White"], price: 104.99, subtext: "30oz + Straw Support", imagePath: "white.png" },
    { name: ["Lite", "Creamy White"], price: 64.99, subtext: "24oz + Hydration Tracking", imagePath: "white.png" },

    // Matte Black
    { name: ["Trek", "Matte Black"], price: 104.99, subtext: "30oz + Straw Support", imagePath: "black.png" },
    { name: ["Lite", "Matte Black"], price: 64.99, subtext: "24oz + Hydration Tracking", imagePath: "black.png" },

    // Light Grey
    { name: ["Trek", "Light Grey"], price: 104.99, subtext: "30oz + Straw Support", imagePath: "silver.png" },
    { name: ["Lite", "Light Grey"], price: 64.99, subtext: "24oz + Hydration Tracking", imagePath: "silver.png" },

    // Navy Blue
    { name: ["Trek", "Navy Blue"], price: 104.99, subtext: "30oz + Straw Support", imagePath: "blue.png" },
    { name: ["Lite", "Navy Blue"], price: 64.99, subtext: "24oz + Hydration Tracking", imagePath: "blue.png" },

    // Dark Red
    { name: ["Trek", "Dark Red"], price: 104.99, subtext: "30oz + Straw Support", imagePath: "red.png" },
    { name: ["Lite", "Dark Red"], price: 64.99, subtext: "24oz + Hydration Tracking", imagePath: "red.png" },
    // Auto Filtering Straws
    {
        name: ["Straws", "Filtered", "4 Pack"],
        price: 24.99,
        subtext: "4 straws • 8 months",
        imagePath: "filtered.png",
    },
    {
        name: ["Straws", "Carbonated", "4 Pack"],
        price: 44.99,
        subtext: "4 straws • 8 months",
        imagePath: "carbonated.png",
    },
    {
        name: ["Straws", "Filtered", "2 Pack"],
        price: 14.99,
        subtext: "2 straws • 4 months",
        imagePath: "filtered.png",
    },
    {
        name: ["Straws", "Carbonated", "2 Pack"],
        price: 24.99,
        subtext: "2 straws • 4 months",
        imagePath: "carbonated.png",
    },

    // Flavor Pods — 4 Pack (1 Month)
    { name: ["Flavors", "Wild Berry"], price: 14.99, subtext: "4 pods • 1 month of flavor", imagePath: "grape.png" },
    { name: ["Flavors", "Orange Blast"], price: 14.99, subtext: "4 pods • 1 month of flavor", imagePath: "orange.png" },
    { name: ["Flavors", "Mystic Mango"], price: 14.99, subtext: "4 pods • 1 month of flavor", imagePath: "mango.png" },
    { name: ["Flavors", "Acai Paradise"], price: 14.99, subtext: "4 pods • 1 month of flavor", imagePath: "acai.png" },
    { name: ["Flavors", "Watermelon Rush"], price: 14.99, subtext: "4 pods • 1 month of flavor", imagePath: "watermelon.png" },
    { name: ["Flavors", "Piña Colada"], price: 14.99, subtext: "4 pods • 1 month of flavor", imagePath: "pina.png" },
    { name: ["Flavors", "Lemon Lime"], price: 14.99, subtext: "4 pods • 1 month of flavor", imagePath: "lemon.png" },
    { name: ["Flavors", "Strawberry Kiwi"], price: 14.99, subtext: "4 pods • 1 month of flavor", imagePath: "strawberry.png" },

    // Flavor Pods — 2 Pack (2 Weeks)
    { name: ["Flavors", "Wild Berry"], price: 7.99, subtext: "2 pods • 2 weeks of flavor", imagePath: "grape.png" },
    { name: ["Flavors", "Orange Blast"], price: 7.99, subtext: "2 pods • 2 weeks of flavor", imagePath: "orange.png" },
    { name: ["Flavors", "Mystic Mango"], price: 7.99, subtext: "2 pods • 2 weeks of flavor", imagePath: "mango.png" },
    { name: ["Flavors", "Acai Paradise"], price: 7.99, subtext: "2 pods • 2 weeks of flavor", imagePath: "acai.png" },
    { name: ["Flavors", "Watermelon Rush"], price: 7.99, subtext: "2 pods • 2 weeks of flavor", imagePath: "watermelon.png" },
    { name: ["Flavors", "Piña Colada"], price: 7.99, subtext: "2 pods • 2 weeks of flavor", imagePath: "pina.png" },
    { name: ["Flavors", "Lemon Lime"], price: 7.99, subtext: "2 pods • 2 weeks of flavor", imagePath: "lemon.png" },
    { name: ["Flavors", "Strawberry Kiwi"], price: 7.99, subtext: "2 pods • 2 weeks of flavor", imagePath: "strawberry.png" },
];