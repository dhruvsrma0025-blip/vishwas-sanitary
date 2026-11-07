/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SITE CONTENT — EDIT EVERYTHING HERE
 * ─────────────────────────────────────────────────────────────────────────────
 *  Shop name, phone numbers, address, timings, social links, gallery photos,
 *  page copy and SEO text all live in this one file.
 *  Gallery images live in: client/src/assets/gallery
 *  Sanitary gallery photos are real showroom photos; fancy gallery images
 *  are display references and can be replaced as shop photos become available.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import wallPanelImg from '../assets/gallery/shop-wall-panel-finishes.webp';
import designerBasinImg from '../assets/gallery/shop-designer-pedestal-basin.webp';
import modernBathroomImg from '../assets/gallery/shop-modern-bathroom-display.webp';
import vanityToiletImg from '../assets/gallery/shop-vanity-toilet-display.webp';
import bathroomSetImg from '../assets/gallery/shop-bathroom-set-display.webp';
import bathShowerImg from '../assets/gallery/shop-bath-shower-display.webp';
import flutedPanelImg from '../assets/gallery/shop-fluted-wall-panels.webp';
import silverBasinImg from '../assets/gallery/shop-silver-basin-display.webp';
import basinMixerImg from '../assets/gallery/shop-basin-mixer-display.webp';
import glassShowerImg from '../assets/gallery/shop-glass-shower-display.webp';
import bathVanityImg from '../assets/gallery/shop-bath-vanity-display.webp';
import showerPanelImg from '../assets/gallery/shop-shower-panel-display.webp';
import blackBasinImg from '../assets/gallery/shop-black-wall-basin.webp';
import tapRangeImg from '../assets/gallery/shop-tap-mixer-range.webp';
import toiletShelfImg from '../assets/gallery/shop-toilet-shelf-display.webp';
import pedestalBasinImg from '../assets/gallery/shop-pedestal-basin-display.webp';
import bathroomShelvesImg from '../assets/gallery/shop-bathroom-shelves.webp';
import livingRoomImg from '../assets/gallery/fancy-living-room.webp';
import bedroomImg from '../assets/gallery/fancy-bedroom.webp';
import bohoLivingImg from '../assets/gallery/fancy-boho-living.webp';
import statementSofaImg from '../assets/gallery/fancy-statement-sofa.webp';
import galleryWallImg from '../assets/gallery/fancy-gallery-wall.webp';
import entrywayImg from '../assets/gallery/fancy-entryway.webp';
import bedroomDecorImg from '../assets/gallery/fancy-bedroom-decor.webp';
import cosyLivingImg from '../assets/gallery/fancy-cosy-living.webp';

const phones = [
  { id: 'primary', display: '9268550000', href: 'tel:+919268550000' },
  { id: 'secondary', display: '9718190000', href: 'tel:+919718190000' },
];

const whatsappMessage =
  'Hello Vishwas Sanitary and Fancy Items, I would like to ask about your products.';

const socialLinks = {
  instagram: 'https://www.instagram.com/vishwas_group_pundri/',
  facebook: 'https://www.facebook.com/Vishwassanitarypundrikaithal/',
};

const socialProfiles = [
  {
    id: 'instagram',
    label: 'Instagram',
    handle: '@vishwas_group_pundri',
    icon: 'instagram',
    url: socialLinks.instagram,
  },
  {
    id: 'facebook',
    label: 'Facebook',
    handle: 'SN Vishwas Sanitary',
    icon: 'facebook',
    url: socialLinks.facebook,
  },
];

const address = {
  line1: 'Pundri',
  line2: 'Kaithal',
  line3: 'Haryana, India',
  full: 'Pundri, Kaithal',
  mapQuery: 'Vishwas Sanitary & Fancy Items, Pundri, Kaithal, Haryana',
};

export const siteData = {
  shop: {
    name: 'Vishwas Sanitary and Fancy Items',
    shortName: 'Vishwas Sanitary',
    wordmark: 'Vishwas',
    wordmarkSub: 'Sanitary & Fancy Items',
    tagline: 'Quality Sanitary & Fancy Items for Your Home',
    description:
      'A local shop in Pundri, Kaithal for sanitary ware, bathroom fittings, taps, showers, pipes and fancy decorative items.',
    locationShort: 'Pundri',
  },

  contact: {
    phones,
    whatsapp: {
      number: '919268550000',
      display: '9268550000',
      message: whatsappMessage,
      url: `https://wa.me/919268550000?text=${encodeURIComponent(whatsappMessage)}`,
    },
    address,
    mapEmbedUrl: `https://www.google.com/maps?q=${encodeURIComponent(address.mapQuery)}&output=embed`,
    directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address.mapQuery)}`,
    email: '', // Optional: add an email address here to show it on the contact page.
    socials: socialProfiles,
  },

  /**
   * SHOP TIMINGS — replace the empty strings with real timings.
   * Example: hours: '9:00 AM – 8:00 PM'
   * Empty values display "Call to confirm" on the website.
   */
  hours: {
    schedule: [
      { days: 'Monday – Saturday', hours: '' },
      { days: 'Sunday', hours: '' },
    ],
    note: 'Please call before visiting to confirm today’s timings.',
  },

  /** Full profile URLs used by the footer and contact page. */
  socialLinks,

  nav: [
    { label: 'Home', to: '/' },
    { label: 'About Us', to: '/about' },
    { label: 'Gallery', to: '/gallery' },
    { label: 'Contact', to: '/contact' },
  ],

  hero: {
    greeting: 'आपका स्वागत है',
    welcomeText: 'Welcome to',
    eyebrow: 'Pundri · Kaithal, Haryana',
    title: 'Vishwas Sanitary',
    titleAccent: '& Fancy Items',
    tagline: 'Quality Sanitary & Fancy Items for Your Home',
    description:
      'Taps, bathroom fittings, pipes, basins and decorative items — brought together in one friendly local shop.',
    primaryCta: 'Call Now',
    secondaryCta: 'View Gallery',
    trustPoints: ['Sanitary ware', 'Bathroom fittings', 'Fancy & decor'],
    images: {
      main: {
        src: bathVanityImg,
        alt: 'Bathroom display with a vanity, bath and glass shower at the Vishwas Sanitary showroom',
      },
      secondary: { src: livingRoomImg, alt: 'A warm, decorated living room with fancy items' },
      detail: {
        src: tapRangeImg,
        alt: 'Tap and mixer range on display at the Vishwas Sanitary showroom',
      },
    },
  },

  marquee: [
    'Taps & Mixers',
    'Showers',
    'Wash Basins',
    'Toilets',
    'Bathroom Fittings',
    'Pipes & Plumbing',
    'Fancy Items',
    'Home Décor',
  ],

  highlights: {
    eyebrow: 'What You Will Find',
    title: 'One shop for bathroom and home',
    description:
      'Practical sanitary ware for everyday use, plus decorative pieces to add a little character to your home.',
    items: [
      {
        id: 'bathroom-fittings',
        number: '01',
        title: 'Bathroom Fittings',
        description:
          'Basins, toilets, bathroom accessories and the fittings that complete a practical bathroom.',
        icon: 'bath',
        to: '/gallery?category=sanitary',
      },
      {
        id: 'taps-showers',
        number: '02',
        title: 'Taps & Showers',
        description:
          'Taps, mixers and shower options for everyday use, replacements and bathroom upgrades.',
        icon: 'shower',
        to: '/gallery?category=sanitary',
      },
      {
        id: 'pipes-plumbing',
        number: '03',
        title: 'Pipes & Plumbing',
        description:
          'Pipes and plumbing items for repairs, new fittings and everyday home requirements.',
        icon: 'pipe',
        to: '/gallery?category=sanitary',
      },
      {
        id: 'fancy-decor',
        number: '04',
        title: 'Fancy & Décor Items',
        description:
          'Decorative pieces and fancy items to bring warmth, colour and personality into your rooms.',
        icon: 'decor',
        to: '/gallery?category=fancy',
      },
    ],
  },

  whyChooseUs: {
    eyebrow: 'Why Vishwas',
    title: 'The convenience of a shop you can walk into',
    description:
      'Buying for your home is easier when you can see the items, ask questions and get a straightforward answer.',
    items: [
      {
        id: 'quality',
        title: 'Quality Products',
        description:
          'A range of sanitary ware and fancy items selected for everyday home use.',
        icon: 'quality',
      },
      {
        id: 'price',
        title: 'Fair Prices',
        description:
          'Tell us what you need and your budget — we will show you the options that fit.',
        icon: 'price',
      },
      {
        id: 'variety',
        title: 'Wide Variety',
        description:
          'From a single tap to bathroom fittings and décor pieces, find them together.',
        icon: 'variety',
      },
      {
        id: 'local',
        title: 'Trusted Local Shop',
        description:
          'Visit us in person in Pundri, Kaithal and get help choosing the right item.',
        icon: 'local',
      },
    ],
  },

  gallery: {
    eyebrow: 'A Look Around',
    title: 'Sanitary & fancy inspiration',
    description:
      'A look around our showroom in Pundri, with sanitary displays and a few fancy item references. Filter by category to explore.',
    categories: [
      { id: 'all', label: 'All' },
      { id: 'sanitary', label: 'Sanitary' },
      { id: 'fancy', label: 'Fancy Items' },
    ],
    note:
      'Sanitary photos are from our Pundri showroom. Fancy item photos are display references — visit the shop to see the current range.',
    items: [
      {
        id: 'wall-panel-finishes',
        title: 'Wall Panel Finishes',
        category: 'sanitary',
        image: wallPanelImg,
        alt: 'Wall panel samples in fluted and marble finishes at the Vishwas Sanitary showroom',
        caption: 'Panel finishes for walls and bathrooms.',
      },
      {
        id: 'designer-pedestal-basin',
        title: 'Designer Pedestal Basin',
        category: 'sanitary',
        image: designerBasinImg,
        alt: 'Designer pedestal wash basin displayed against a grey tiled wall',
        caption: 'Statement basins for compact bathrooms.',
      },
      {
        id: 'modern-bathroom-display',
        title: 'Modern Bathroom Display',
        category: 'sanitary',
        image: modernBathroomImg,
        alt: 'Bathroom display with a toilet, vanity counter and black accent wall',
        caption: 'Complete bathroom settings on display.',
      },
      {
        id: 'vanity-toilet-display',
        title: 'Vanity & Toilet Display',
        category: 'sanitary',
        image: vanityToiletImg,
        alt: 'Bathroom display with a white vanity counter and toilet',
        caption: 'Vanity and toilet combinations.',
      },
      {
        id: 'bathroom-set-display',
        title: 'Bathroom Set Display',
        category: 'sanitary',
        image: bathroomSetImg,
        alt: 'Toilet and vanity display with a black marble counter',
        caption: 'Matching sets for a clean bathroom look.',
      },
      {
        id: 'bath-shower-display',
        title: 'Bath & Shower Display',
        category: 'sanitary',
        image: bathShowerImg,
        alt: 'Bath and shower display with a glass screen and towels',
        caption: 'Shower and bath options side by side.',
      },
      {
        id: 'fluted-wall-panels',
        title: 'Fluted Wall Panels',
        category: 'sanitary',
        image: flutedPanelImg,
        alt: 'Fluted and marble wall panel samples on showroom display',
        caption: 'Fluted and marble panel options.',
      },
      {
        id: 'silver-basin-display',
        title: 'Silver Basin Display',
        category: 'sanitary',
        image: silverBasinImg,
        alt: 'Silver designer basin on a pedestal in the showroom',
        caption: 'Basin styles for everyday use.',
      },
      {
        id: 'basin-mixer-display',
        title: 'Basin Mixer Display',
        category: 'sanitary',
        image: basinMixerImg,
        alt: 'Basin mixer tap displayed on white steps',
        caption: 'Mixers and taps for basins.',
      },
      {
        id: 'glass-shower-display',
        title: 'Glass Shower Display',
        category: 'sanitary',
        image: glassShowerImg,
        alt: 'Glass shower enclosure with a bath and towel rail',
        caption: 'Glass showers with bath fittings.',
      },
      {
        id: 'bath-vanity-display',
        title: 'Bath Vanity Display',
        category: 'sanitary',
        image: bathVanityImg,
        alt: 'Bathroom display with a black floral vanity and glass shower screen',
        caption: 'Vanity, bath and shower in one display.',
      },
      {
        id: 'shower-panel-display',
        title: 'Shower Panel Display',
        category: 'sanitary',
        image: showerPanelImg,
        alt: 'Shower panel and bath display in the showroom',
        caption: 'Shower panels and bath fittings.',
      },
      {
        id: 'black-wall-basin',
        title: 'Black Wall Basin',
        category: 'sanitary',
        image: blackBasinImg,
        alt: 'Black rectangular wall-mounted wash basin',
        caption: 'A bold basin for modern bathrooms.',
      },
      {
        id: 'tap-mixer-range',
        title: 'Tap & Mixer Range',
        category: 'sanitary',
        image: tapRangeImg,
        alt: 'Black, gold and chrome tap and mixer range on display',
        caption: 'Finishes to match your bathroom.',
      },
      {
        id: 'toilet-shelf-display',
        title: 'Toilet & Shelf Display',
        category: 'sanitary',
        image: toiletShelfImg,
        alt: 'Toilet and bathroom shelf display',
        caption: 'Toilets, shelves and fittings.',
      },
      {
        id: 'pedestal-basin-display',
        title: 'Pedestal Basin Display',
        category: 'sanitary',
        image: pedestalBasinImg,
        alt: 'Designer pedestal basin on a grey tiled display',
        caption: 'Pedestal basins in popular designs.',
      },
      {
        id: 'bathroom-shelves',
        title: 'Bathroom Shelves',
        category: 'sanitary',
        image: bathroomShelvesImg,
        alt: 'Bathroom storage shelves on showroom display',
        caption: 'Shelving ideas for bathroom storage.',
      },
      {
        id: 'living-room-decor',
        title: 'Living Room Fancy Items',
        category: 'fancy',
        image: livingRoomImg,
        alt: 'a warm living room with decorative accents',
        caption: 'Decorative pieces that bring a room together.',
      },
      {
        id: 'bedroom-styling',
        title: 'Decorative Bedroom Styling',
        category: 'fancy',
        image: bedroomImg,
        alt: 'a softly decorated bedroom with a woven screen',
        caption: 'Texture, light and decorative details.',
      },
      {
        id: 'boho-accents',
        title: 'Wall Décor & Accents',
        category: 'fancy',
        image: bohoLivingImg,
        alt: 'a boho living room with woven wall decor',
        caption: 'Statement pieces for a personal touch.',
      },
      {
        id: 'statement-sofa',
        title: 'Statement Furniture Accents',
        category: 'fancy',
        image: statementSofaImg,
        alt: 'a deep green sofa against a pale wall',
        caption: 'A pop of colour for your living space.',
      },
      {
        id: 'gallery-wall',
        title: 'Gallery Wall Ideas',
        category: 'fancy',
        image: galleryWallImg,
        alt: 'a living room with a gallery wall of framed art',
        caption: 'Frames and wall arrangements.',
      },
      {
        id: 'entryway-decor',
        title: 'Console & Entryway Décor',
        category: 'fancy',
        image: entrywayImg,
        alt: 'a wooden console with plants in a bright room',
        caption: 'A welcoming corner near the door.',
      },
      {
        id: 'bedroom-decor',
        title: 'Bedroom Décor Inspiration',
        category: 'fancy',
        image: bedroomDecorImg,
        alt: 'a green bedroom with plants and woven pendant lights',
        caption: 'Soft décor with natural textures.',
      },
      {
        id: 'cosy-living',
        title: 'Cosy Home Styling',
        category: 'fancy',
        image: cosyLivingImg,
        alt: 'a cosy living room with warm decorative lighting',
        caption: 'Warm layers for everyday living.',
      },
    ],
    featuredIds: [
      'designer-pedestal-basin',
      'bath-shower-display',
      'tap-mixer-range',
      'fluted-wall-panels',
      'living-room-decor',
      'modern-bathroom-display',
    ],
  },

  about: {
    eyebrow: 'About Vishwas',
    title: 'A local shop for the things that make a house feel finished.',
    intro:
      'Vishwas Sanitary and Fancy Items is a retail shop in Pundri, Kaithal — bringing bathroom essentials and decorative pieces together under one roof.',
    story: [
      'We keep sanitary ware and fancy items in one place so a trip to the shop can cover more than one need. Looking for a tap, a wash basin or pipe fittings for a repair? You can also pick up something decorative for your living room or bedroom while you are here.',
      'You do not need an appointment or an online checkout. You can see the items, ask about availability and talk through what will work for your space. Whether you are planning a new bathroom, replacing a fitting or adding the final touches to a room, we are happy to help you find the right option.',
      'Our aim is simple: to be a helpful, trustworthy local shop for Pundri and the nearby areas — with practical choices, clear answers and a range worth visiting for.',
    ],
    storyEyebrow: 'Our story',
    storyTitle: 'Sanitary essentials and fancy touches, side by side.',
    mission: {
      title: 'Our mission',
      text: 'To make it easier for local families to find dependable bathroom and home items in one convenient place, with straightforward help choosing what suits their needs and budget.',
    },
    valuesEyebrow: 'What guides us',
    valuesTitle: 'Practical choices, helpful service',
    valuesDescription:
      'A few simple principles shape how we run the shop and how we talk to the people who visit us.',
    values: [
      {
        id: 'helpful',
        title: 'Helpful guidance',
        description:
          'We explain the options in simple terms so you can choose what suits your home.',
        icon: 'local',
      },
      {
        id: 'practical',
        title: 'A practical range',
        description:
          'Everyday sanitary ware and fancy items brought together in one local shop.',
        icon: 'variety',
      },
      {
        id: 'clear',
        title: 'Clear conversation',
        description:
          'Ask about items, availability and prices directly — no confusing online checkout.',
        icon: 'price',
      },
      {
        id: 'convenient',
        title: 'Local convenience',
        description:
          'Easy to visit in Pundri, Kaithal and speak to someone in person.',
        icon: 'quality',
      },
    ],
    sells: {
      eyebrow: 'Our range',
      title: 'What we sell',
      description:
        'A practical mix for bathrooms, repairs, renovations and the finishing touches around your home.',
      sanitaryTitle: 'Sanitary ware & bathroom fittings',
      sanitaryDescription: 'For bathrooms, repairs, renovations and everyday plumbing.',
      fancyTitle: 'Fancy & decorative items',
      fancyDescription: 'For the finishing touches that make a room feel like yours.',
      stockNote:
        'Availability can vary. If you need a specific item, call us before visiting and we will let you know.',
      sanitary: [
        'Taps & mixers',
        'Showers & shower fittings',
        'Wash basins',
        'Toilets & bathroom fittings',
        'Bathroom accessories',
        'Pipes & plumbing items',
      ],
      fancy: [
        'Fancy & decorative items',
        'Home décor accents',
        'Wall décor & display pieces',
        'Decorative accessories',
      ],
    },
  },

  contactPage: {
    eyebrow: 'Get in touch',
    title: 'We are here to help',
    description:
      'Call, message on WhatsApp or send us a note. We will get back to you as soon as we can.',
    formTitle: 'Send us a message',
    formDescription:
      'Share what you are looking for and the best number to reach you on. We will get back to you as soon as we can.',
  },

  seo: {
    siteName: 'Vishwas Sanitary and Fancy Items, Pai Road, Pundri',
    // Production domain used for canonical, og:url and og:image URLs.
    // Replace this with the real domain before going live.
    siteUrl: 'https://yourdomain.com',
    locale: 'en_IN',
    ogImage: '/images/og-image.webp',
    ogImageType: 'image/webp',
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageAlt:
      'Vishwas Sanitary and Fancy Items showroom on Pai Road, Pundri, Kaithal',
    keywords: [
      'sanitary shop in Pundri',
      'Pundri Kaithal',
      'fancy items Kaithal',
      'bathroom fittings Pundri',
      'taps showers Pundri',
      'sanitary ware Kaithal',
      'plumbing pipes Pundri',
      'Vishwas Sanitary and Fancy Items',
    ],
    pages: {
      home: {
        title: 'Vishwas Sanitary and Fancy Items | Sanitary Shop in Pundri',
        description:
          'Sanitary ware, bathroom fittings, taps, showers, pipes and fancy items in Pundri, Kaithal. Visit Vishwas Sanitary and Fancy Items in Pundri, Kaithal, or call 9268550000.',
        ogTitle: 'Vishwas Sanitary and Fancy Items, Pai Road, Pundri',
        ogDescription:
          'Explore sanitary ware, bathroom fittings, taps, showers, pipes and fancy décor at our Pai Road showroom in Pundri, Kaithal. Call 9268550000.',
      },
      about: {
        title: 'About Us | Vishwas Sanitary and Fancy Items, Pundri',
        description:
          'Learn about Vishwas Sanitary and Fancy Items, a local shop in Pundri, Kaithal for bathroom fittings, sanitary ware and decorative fancy items.',
        ogTitle: 'About Vishwas Sanitary and Fancy Items, Pundri',
        ogDescription:
          'Meet the local team behind Vishwas Sanitary and Fancy Items — trusted guidance for bathroom fittings, sanitary ware and fancy décor in Pundri, Kaithal.',
      },
      gallery: {
        title: 'Gallery | Sanitary & Fancy Items in Pundri',
        description:
          'Browse bathroom, tap, basin and home décor inspiration from Vishwas Sanitary and Fancy Items in Pundri, Kaithal, Haryana.',
        ogTitle: 'Gallery | Sanitary & Fancy Items in Pundri',
        ogDescription:
          'See real photos of bathroom displays, taps, basins, wall panels and fancy décor at Vishwas Sanitary and Fancy Items, Pai Road, Pundri.',
      },
      contact: {
        title: 'Contact | Vishwas Sanitary & Fancy Items, Pundri, Kaithal',
        description:
          'Call 9268550000 or 9718190000, message on WhatsApp or find Vishwas Sanitary and Fancy Items in Pundri, Kaithal, Haryana.',
        ogTitle: 'Contact Vishwas Sanitary and Fancy Items, Pundri',
        ogDescription:
          'Call 9268550000 or 9718190000, message us on WhatsApp, or visit our Pai Road showroom in Pundri, Kaithal. We are happy to help.',
      },
      notFound: {
        title: 'Page Not Found | Vishwas Sanitary and Fancy Items',
        description:
          'The page you were looking for could not be found. Visit the home page of Vishwas Sanitary and Fancy Items in Pundri.',
        ogTitle: 'Page Not Found | Vishwas Sanitary and Fancy Items',
        ogDescription:
          'The page you were looking for could not be found. Return to the Vishwas Sanitary and Fancy Items home page or contact us in Pundri.',
      },
    },
  },
};

export const { gallery, about, contact, hero, hours } = siteData;

/** Utility used by contact cards to avoid repeating placeholder logic in pages. */
export const getHoursLabel = (value) => (value && value.trim() ? value : 'Call to confirm');
