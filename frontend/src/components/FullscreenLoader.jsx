import { motion } from "framer-motion";

const FullscreenLoader = ({ text }) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center backdrop-blur-sm">
      <motion.div
        className="h-14 w-14 rounded-full border-4 border-indigo-500 border-t-transparent"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
      <p className="mt-4 text-gray-600 font-medium">{text}</p>
    </div>
  );
};

export default FullscreenLoader;
