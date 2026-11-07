import {
  FaArrowRight,
  FaArrowUp,
  FaBars,
  FaBath,
  FaCheck,
  FaChevronLeft,
  FaChevronRight,
  FaCircleCheck,
  FaCircleInfo,
  FaClock,
  FaCommentDots,
  FaCompress,
  FaCouch,
  FaDiamondTurnRight,
  FaDroplet,
  FaEnvelope,
  FaExpand,
  FaFacebookF,
  FaInstagram,
  FaLayerGroup,
  FaLocationDot,
  FaMagnifyingGlassPlus,
  FaMinus,
  FaPaperPlane,
  FaPhone,
  FaRobot,
  FaRotateRight,
  FaShower,
  FaSpinner,
  FaStore,
  FaTag,
  FaTriangleExclamation,
  FaWhatsapp,
  FaWrench,
  FaXmark,
} from 'react-icons/fa6';

const icons = {
  arrow: FaArrowRight,
  up: FaArrowUp,
  menu: FaBars,
  bath: FaBath,
  check: FaCheck,
  left: FaChevronLeft,
  right: FaChevronRight,
  quality: FaCircleCheck,
  info: FaCircleInfo,
  clock: FaClock,
  chat: FaCommentDots,
  compress: FaCompress,
  decor: FaCouch,
  droplet: FaDroplet,
  directions: FaDiamondTurnRight,
  mail: FaEnvelope,
  expand: FaExpand,
  facebook: FaFacebookF,
  instagram: FaInstagram,
  variety: FaLayerGroup,
  location: FaLocationDot,
  zoom: FaMagnifyingGlassPlus,
  minimize: FaMinus,
  send: FaPaperPlane,
  phone: FaPhone,
  reset: FaRotateRight,
  robot: FaRobot,
  shower: FaShower,
  spinner: FaSpinner,
  store: FaStore,
  price: FaTag,
  warning: FaTriangleExclamation,
  whatsapp: FaWhatsapp,
  pipe: FaWrench,
  close: FaXmark,
};

export default function Icon({ name, size, className, ...rest }) {
  const Component = icons[name] || FaCircleInfo;
  return (
    <Component
      className={className}
      size={size}
      aria-hidden="true"
      focusable="false"
      {...rest}
    />
  );
}
