interface Window {
  showToast: (message: string) => void
}

interface HTMLCanvasElement {
  getContext(contextId: '2d'): CanvasRenderingContext2D | null
}
