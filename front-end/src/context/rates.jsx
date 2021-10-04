/**
 *  rates.jsx
 *  @version: 1.0.0
 *  @author: Trejocode - Sergio
 *  @description: Manejador de ejecuciones del Context para Rates
*/

export function setPreviewRate(data) {
    this.setState({ previewRate: data.previewRate });
};

export function setLoadingPreviewRate(data) {
    this.setState({ loadingPreviewRate: data.loadingPreviewRate });
};

export function setAvailableCheckout(data) {
    this.setState({ availableCheckout: data.availableCheckout });
};