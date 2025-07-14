import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, User } from 'lucide-react';
import illustration from '/image.png';
import InputField from '../components/InputField';
import AuthFooter from '../components/AuthFooter';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [toggle, setToggle] = useState({
    password: false,
    confirmPassword: false,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password.trim()) newErrors.password = 'Password is required';
    if (!formData.confirmPassword.trim())
      newErrors.confirmPassword = 'Please confirm your password';
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log('Signup Data:', formData);
      // API call or further action here
    }
  };

  return (
    <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-md overflow-hidden">
      {/* Form Section */}
      <div className="w-full md:w-1/2 p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-indigo-600">
            <i className="fa-solid fa-file-lines text-xl text-indigo-600"></i> ATS Resume Checker
          </h2>
          <p className="text-sm text-gray-500 mt-1">Create your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          <InputField
            label="Full Name"
            icon={User}
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            error={!!errors.name}
            errorMessage={errors.name}
          />
          <InputField
            label="Email Address"
            icon={Mail}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            error={!!errors.email}
            errorMessage={errors.email}
          />
          <InputField
            label="Password"
            icon={Lock}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a password"
            showToggle
            showPassword={toggle.password}
            onToggle={() =>
              setToggle((prev) => ({ ...prev, password: !prev.password }))
            }
            error={!!errors.password}
            errorMessage={errors.password}
          />
          <InputField
            label="Confirm Password"
            icon={Lock}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            showToggle
            showPassword={toggle.confirmPassword}
            onToggle={() =>
              setToggle((prev) => ({
                ...prev,
                confirmPassword: !prev.confirmPassword,
              }))
            }
            error={!!errors.confirmPassword}
            errorMessage={errors.confirmPassword}
          />

          <div className="text-sm text-gray-500">
            <label className="flex items-start gap-2">
              <input type="checkbox" required className="mt-1" />
              <span>
                I agree to the{' '}
                <Link to="/terms" className="text-sky-500 hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-sky-500 hover:underline">
                  Privacy Policy
                </Link>
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-2 text-white bg-indigo-600 rounded-md font-medium hover:bg-indigo-700 transition"
          >
            Create Account
          </button>
        </form>

        <AuthFooter />
      </div>

      {/* Image Section */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-[#F9FAFB] p-6">
        <img
          src={illustration}
          alt="ATS Resume"
          className="max-h-[60%] object-contain"
        />
      </div>
    </div>
  );
};

export default SignUp;
