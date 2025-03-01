import * as amplitude from "@amplitude/analytics-browser";

const AMPLITUDE_API_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;

export const initAmplitude = () => {
  if (!AMPLITUDE_API_KEY) {
    return;
  }
  if (typeof window !== "undefined") {
    amplitude.init(AMPLITUDE_API_KEY, { autocapture: true, serverZone: "EU" });
  }
};

export const logEvent = (eventName, eventProperties = {}) => {
  amplitude.track(eventName, eventProperties);
};
