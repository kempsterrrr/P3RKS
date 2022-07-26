import mixpanel from "mixpanel-browser";
export class MixpanelTracking {
  private static _instance: MixpanelTracking;

  public static getInstance(): MixpanelTracking {
    if (
      MixpanelTracking._instance === null ||
      MixpanelTracking._instance === undefined
    ) {
      return (MixpanelTracking._instance = new MixpanelTracking());
    }
    return this._instance;
  }

  public constructor() {
    if (MixpanelTracking._instance) {
      throw new Error("Error: Instance creation of MixpanelTracking is not allowed");
    }

    const mixpanelKey = process.env.NODE_ENV == "development" ? process.env.NEXT_PUBLIC_MIXPANEL_ID_TEST : process.env.NEXT_PUBLIC_MIXPANEL_ID_PRODUCTION

    mixpanel.init(mixpanelKey || "",
      { debug: true, ignore_dnt: true }
    );
  }

  protected track(name: string, data: object = {}) {
    mixpanel.track(name, data);
  }

  public landingPageViewed() {
    this.track("landing_page_viewed");
  }

  public connectWallet(source: string) {
    this.track(`${source}_cta_click`);
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

  public walletConnect(wallet: string) {
    this.track(`${wallet}_selected`);
  }

  public walletTypeConnected(type: string) {
    this.track(`${type}_wallet_connected`);
  }

  public perksPageViewed(owner: string) {
    this.track(`${owner}_perks_view`);
  }

  public perkClick(parnerName: string) {
    this.track(`perk_view_${parnerName}`);
  }

  public perksFilter(filter: string) {
    this.track(`perks_filter_${filter.split(" ").join("_").toLowerCase()}`);
  }

  public perksSideNav(target: string) {
    this.track(`sidenav_clicked_${target}`);
  }

  public themeChange(theme: string) {
    this.track(`theme_change_${theme}`);
  }

  public backNav() {
    this.track(`back_nav_perks`);
  }

  public perkLink(target: string) {
    this.track(`perk_link_${target}`);
  }
}
