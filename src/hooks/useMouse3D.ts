import { useMotionValue, useSpring, useTransform } from 'framer-motion';

export function useMouse3D(ref: React.RefObject<HTMLElement | null>, shouldReduceMotion: boolean) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [3, -3]), {
    stiffness: 200,
    damping: 25,
  });

  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-3, 3]), {
    stiffness: 200,
    damping: 25,
  });

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    if (shouldReduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return { rotateX, rotateY, handleMouseMove, handleMouseLeave };
}
