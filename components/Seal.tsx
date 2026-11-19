/** Con dấu son: chữ trắng trên nền đỏ, mép mực loang như dấu đóng tay. */
export function Seal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`seal ${className}`}>{children}</span>;
}
