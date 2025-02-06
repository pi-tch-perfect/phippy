import { MdAdminPanelSettings } from "react-icons/md";

interface HeaderProps {
  onOpenAdmin: () => void;
}

export const Header = ({ onOpenAdmin }: HeaderProps) => {
  return (
    <header className="w-full p-4 flex justify-between items-center bg-black/20 backdrop-blur-sm">
      <h1 className="text-xl font-bold text-white">Pi-tch Perfect</h1>
      <button
        onClick={onOpenAdmin}
        className="p-2 active:bg-white/10 rounded-lg transition-colors text-white"
      >
        <MdAdminPanelSettings />
      </button>
    </header>
  );
};
