import mixpanel from 'mixpanel-browser';
export class MixpanelTracking {
  private static _instance: MixpanelTracking;

  public static getInstance(): MixpanelTracking {
    if (MixpanelTracking._instance === null || MixpanelTracking._instance === undefined) {
      return (MixpanelTracking._instance = new MixpanelTracking());
    }
    return this._instance;
  }

  public constructor() {
    if (MixpanelTracking._instance) {
      throw new Error("Error: Instance creation of MixpanelTracking is not allowed");
    }
    mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_ID || "",
      { debug: true, ignore_dnt: true }
    );
  }

  protected track(name: string, data: object = {}) {
    mixpanel.track(name, data);
  }

  public pageViewed() {
    this.track("page_viewed");
  }

  public ctaClicked(type: string = "primary") {
    this.track(`cta_${type}_clicked`);
  }

  public modalOpen() {
    this.track("sign_up_modal_open");
  }
}