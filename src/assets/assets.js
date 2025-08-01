import logo from './logo.svg'
import logo_dark from './logo_dark.svg'
import cross_icon from './cross_icon.svg'
import menu_icon from './menu_icon.svg'
import star_icon from './star_icon.svg'
import left_arrow from './left_arrow.svg'
import right_arrow from './right_arrow.svg'
import header_img from './header_img.png'
import brand_img from './brand_img.png'
import dahwenya_pic1 from './dawhwnya1.jpeg'
import dahwenya_pic2 from './dawhwnya2.jpeg'
import dahwenya_pic3 from './dawhwnya3.jpeg'
import dahwenya_pic4 from './dawhwnya4.jpeg'
import dahwenya_pic5 from './dawhwnya5.jpeg'
import dahwenya_vid from './dawenyavid.mp4'
import tamale_pic1 from  './tamale1.jpeg'
import tamale_pic2 from  './tamale2.jpeg'
import tamale_pic3 from  './tamale3.jpeg'
import tamale_pic4 from  './tamale4.jpeg'
import tamale_pic5 from  './tamale5.jpeg'
import tamale_pic6 from  './tamale6.jpeg'
import tamale_pic7 from  './tamale7.jpeg'
import eastlegon_pic1 from './eastlegon1.jpeg'
import eastlegon_pic2 from './eastlegon2.jpeg'
import eastlegon_pic3 from './eastlegon3.jpeg'
import eastlegon_pic4 from './eastlegon4.jpeg'
import eastlegon_pic5 from './eastlegon5.jpeg'
import frafraha_pic1 from './frafraha.jpeg'
import frafraha_pic2 from './frafraha1.jpeg'
import profile_img_1 from './profile_img_1.jpeg'
import profile_img_2 from './profile_img_2.jpeg'
import profile_img_3 from './profile_img_3.jpeg'
import phone from './phone.png'
import logo1 from './logo1.png'
import logo2 from './logo2.png'
import renovation_png from './renovation.png'
import propdevelopment_png from './propdev.jpg'
import propmanagement_png from './propman.jpeg'
import proprenovation_png from './proprenov.jpg'
import landsale_png from './landsale.jpeg'
import front_east from './Feastlegon2.jpeg'
import front_dawhenya from './Fdawhwnya4.jpeg'
import front_tamale from './Ftamale7.jpeg'
import { desc, video } from 'framer-motion/client'

export const assets = {
    proprenovation_png,
    propdevelopment_png,
    propmanagement_png,
    landsale_png,
    logo,
    logo_dark,
    cross_icon,
    menu_icon,
    star_icon,
    header_img,
    brand_img,
    front_east,
    front_dawhenya, 
    front_tamale,
    dahwenya_pic1,
    dahwenya_pic2,
    dahwenya_pic3,
    dahwenya_pic4,
    dahwenya_pic5,
    eastlegon_pic1,
    eastlegon_pic2,
    eastlegon_pic3,                       
    eastlegon_pic4,
    eastlegon_pic5,
    frafraha_pic1,                          
    frafraha_pic2,
    tamale_pic1,          
    tamale_pic2,
    tamale_pic3,      
    tamale_pic4,
    tamale_pic5,  
    tamale_pic6,
    tamale_pic7,
    dahwenya_vid,
    left_arrow,
    right_arrow,
    phone, 
    logo1,
    logo2,
    renovation_png
}

export const projectsData = [
    {
      id:1,
      title: "5 bedroom House",
      description: "A spacious 5-bedroom house with a modern design.",
      location: "East Legon",
      image: [
        front_east,
        eastlegon_pic1,
        eastlegon_pic2,        
        eastlegon_pic3,
        eastlegon_pic4,  
        eastlegon_pic5,
      ],
      frontimage: front_east,
      alt: "East Legon Project Front View",
      video: null,
      status: "Status: Completed ✅"
    },
    {
      id:2,
      title: "Guest House",
      description: "A cozy guest house under construction at the airport avenue.",
      location: "Tamale",
      image: [
        tamale_pic1,
        tamale_pic2,        
        tamale_pic3,
        tamale_pic4,  
        tamale_pic5,  
        tamale_pic6,
        tamale_pic7,
      ],
      frontimage: front_tamale,
      alt: "Tamale Project Front View",
      video: null,
      status: "Status: Under Construction ⛔️"
    },
    {
      id:3,
      title: "Modern Apartments",
      description: "A luxurious apartment complex with modern amenities and stunning views.",
      location: "Dawhenya",
      image:[
        dahwenya_pic1,
        dahwenya_pic2,        
        dahwenya_pic3,
        dahwenya_pic4,  
        dahwenya_pic5,  
      ],
      frontimage: front_dawhenya,
      alt: "Dawhenya Project Front View",
      video: dahwenya_vid,
      status: "Status: Completed ✅"
    },
    {
      id:4,
      title: "Customized Apartments",
      description: "A customized apartment complex with unique designs and features.",
      location: "Frafraha",
      image: [
        frafraha_pic1,
        frafraha_pic2,
      ],
      frontimage: frafraha_pic1,
      alt: "Frafraha Project Front View",
      video: null,
      status: "Status: Under Construction ⛔️"
    },
  ];

  export const testimonialsData = [
    {
        name: "Charles Amuri",
        title: "Trader",
        image: profile_img_1,
        alt: "Portrait of Charles Amuri",
        rating: 5,
        text: "From the very first meeting, they understood my vision and helped me find the perfect property. Their attention to detail and commitment to client satisfaction is unmatched."
    },
    {
        name: "Richard Amoah",
        title: "Coperate Worker",
        image: profile_img_2,
        alt: "Portrait of Richard Amoah",
        rating: 4,
        text: "From the very first meeting, they understood my vision and helped me find the perfect property. Their attention to detail and commitment to client satisfaction is unmatched."
    },
    {
        name: "James Mensah",
        title: "Business Owner",
        image: profile_img_3,
        alt: "Portrait of James Mensah",
        rating: 5,
        text: "From the very first meeting, they understood my vision and helped me find the perfect property. Their attention to detail and commitment to client satisfaction is unmatched."
    }
];

