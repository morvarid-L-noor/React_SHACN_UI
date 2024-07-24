import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="flex justify-between gap-5 bg-card py-4 sm:container max-sm:px-4 xl:max-w-full xl:px-24">
      <span>
        © 2024
        {/* <span className="text-primary">Tether</span> */}
      </span>
      <div className="space-x-3">
        <Link to="/about" className="hover:underline">
          About
        </Link>
        <Link to="/team" className="hover:underline">
          Team
        </Link>
        <Link to="/contact" className="hover:underline">
          Contact
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
