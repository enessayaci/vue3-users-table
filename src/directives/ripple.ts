import type { DirectiveBinding } from 'vue';

const rippleDirective = {
  beforeMount(el: HTMLElement, binding: DirectiveBinding) {
    el.style.position = 'relative'; // Ripple için relative konum
    el.style.overflow = 'hidden'; // Ripple'ın taşmasını önlemek için

    el.addEventListener('click', function (event: MouseEvent) {
      const ripple = document.createElement('span');
      const rect = el.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = event.clientX - rect.left - size / 2;
      const y = event.clientY - rect.top - size / 2;

      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;
      ripple.style.position = 'absolute';
      ripple.style.borderRadius = '50%';
      ripple.style.background = 'rgba(255, 255, 255, 0.6)'; // Ripple rengi
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.style.pointerEvents = 'none';
      ripple.style.transform = 'scale(0)';
      ripple.style.animation = 'ripple-animation 600ms linear';

      el.appendChild(ripple);

      setTimeout(() => {
        ripple.remove(); // Ripple'ı 600 ms sonra kaldır
      }, 600); // Ripple efektinin süresi
    });
  },
};

export default rippleDirective; // Default export

