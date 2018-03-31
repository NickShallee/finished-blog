import environment from './environment';
import {I18N, Backend} from 'aurelia-i18n';

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature('resources')
    .plugin('aurelia-validation')
    .plugin('aurelia-i18n', instance => {
      instance.i18next.use(Backend.with(aurelia.loader));
      return instance.setup({
        backend: {
          loadPath: './locales/{{lng}}/{{ns}}.json'
        },
        lng: 'en-ca',
        fallback: 'fr',
        ns: ['nav', 'post-form'],
        debug: false
      });
    });

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  aurelia.start().then(() => aurelia.setRoot());
}
