import React from 'react';
import { Link } from 'react-router-dom';

const AuthFooter = () => (
  <>
    <p className="text-center text-sm mt-4 text-gray-500">
      Already have an account?{' '}
      <Link to="/login" className="text-indigo-600 font-medium">
        Log in
      </Link>
    </p>
    
  </>
);

export default AuthFooter;
