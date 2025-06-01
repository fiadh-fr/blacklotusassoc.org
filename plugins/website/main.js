const d = require("../../main/modules/plugins/manager.js");
const e = require("./dev.json");
const f = {
  commands: {
    config: {
      general: {
        'stats': undefined,
        ping: undefined,
        restart: undefined,
        uptime: undefined,
      },
    },
    lang: undefined,
  },
  cooldown: {
    config: {
      enabled: undefined,
      default: undefined,
      role_bypass: {
        enabled: undefined,
        role_id: undefined,
      },
      general: {
        'stats': undefined,
        ping: undefined,
        restart: undefined,
        uptime: undefined,
      },
    },
    lang: {},
  },
  lang: {
    lang: {
      unexpected_command_error_icon: undefined,
      unexpected_function_error_icon: undefined,
      unexpected_command_error: undefined,
      unexpected_function_error: undefined,
      embed_footer: undefined,
    },
    interaction_names: {
      general_confirmation_proceed: undefined,
      general_confirmation_cancel: undefined,
    },
  },
  general: {
    config: {
      activity: {
        status: undefined,
        activity_type: undefined,
        activity: undefined,
      },
    },
    lang: {
      success: {
        banner: undefined,
        avatar_success: undefined,
        restart: undefined,
        loading: undefined,
        uptime: undefined,
        confirmation: undefined,
        confirmation_success: undefined,
        ping: undefined,

      },
      errors: {
        restart_running: undefined,
        owneronly_command: undefined,
        no_permission_command: undefined,
        on_cooldown_command: undefined,
        no_permission_function: undefined,
        on_cooldown_function: undefined,
        invalid_guild: undefined,
      },
    },
  },
  confirmation: {
    config: {
      enabled: undefined,
      timeout_in_seconds: undefined,
      commands_require_confirmation: undefined,
      interaction_require_confirmation: undefined,
    },
    lang: {}
  },
  permission: {
    config: {
      enabled: undefined,
      roles: undefined,
      general: {
        'stats': undefined,
        ping: undefined,
        restart: undefined,
        uptime: undefined,
      },
    },
    lang: {},
  },
};
module.exports = class g extends d {
  constructor(h) {
    super(h, e, null, f);
  }
};
