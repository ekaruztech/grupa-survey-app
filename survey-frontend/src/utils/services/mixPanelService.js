import MixPanel from 'mixpanel-browser';
import isEmpty from 'lodash/isEmpty';

class MixPanelService {
  constructor() {
    if (!MixPanel) {
      throw new Error('MixPanel is not defined');
    }
    this.mixPanel = MixPanel;
    this.mixPanel.init(process.env.REACT_APP_MIXPANEL_TOKEN);
    this.sendEvent = this.sendEvent.bind(this);
    this.saveProfile = this.saveProfile.bind(this);
    this.register = this.register.bind(this);
    this.reset = this.reset.bind(this);
  }
  saveProfile(identification, profile = null) {
    this.mixPanel.identify(identification);
    if (profile && typeof profile === 'object' && !isEmpty(profile)) {
      this.mixPanel.people.set(profile);
    }
  }
  register(payload = {}) {
    this.mixPanel.register(payload);
  }
  sendEvent(eventName, data) {
    this.mixPanel.track(eventName, data ? { data } : {});
  }
  reset() {
    this.mixPanel.reset();
  }
}
export default new MixPanelService();
