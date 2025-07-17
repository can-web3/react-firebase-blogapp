import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../public/logo.svg';

export interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = '' }) => (
  <Link to="/">
    <img src={logo} alt="Logo" className={className} />
  </Link>
);

export default Logo;
