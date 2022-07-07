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

  public landingPageViewed() {
    this.track("landing_page_viewed");
  }

<<<<<<< Updated upstream
  public ctaClicked(type: string = "primary") {
    this.track(`cta_${type}_clicked`);
  }

  public modalOpen() {
    this.track("sign_up_modal_open");
=======
  public connectWallet(source: string) {
    this.track(`${source}_cta_click`);
>>>>>>> Stashed changes
  }

  public closeModal() {
    this.track("connect_modal_close");
  }

  public offerPerk() {
    this.track("offer_perk");
  }

  public daosLink() {
    this.track("daos_link_clicked")
  }

  public partnersLink() {
    this.track("partners_link_clicked")
  }

  // @TODO implement when /perks is fixed
  // public perksPageViewed(owner: string) {
  //   this.track(`${owner}_perks_view`);
  // }

}