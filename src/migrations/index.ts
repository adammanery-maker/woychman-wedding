import * as migration_20260906_224909_initial_schema from './20260906_224909_initial_schema';
import * as migration_20260906_225751_wedding_settings from './20260906_225751_wedding_settings';
import * as migration_20260906_231902_venues_events from './20260906_231902_venues_events';
import * as migration_20260906_232915_content_model from './20260906_232915_content_model';
import * as migration_20260907_002348_rsvp_collections from './20260907_002348_rsvp_collections';
import * as migration_20260907_074800_payload_kv from './20260907_074800_payload_kv';
import * as migration_20260907_140329_registry_visibility from './20260907_140329_registry_visibility';
import * as migration_20260908_003901_add_homepage_video from './20260908_003901_add_homepage_video';

export const migrations = [
  {
    up: migration_20260906_224909_initial_schema.up,
    down: migration_20260906_224909_initial_schema.down,
    name: '20260906_224909_initial_schema',
  },
  {
    up: migration_20260906_225751_wedding_settings.up,
    down: migration_20260906_225751_wedding_settings.down,
    name: '20260906_225751_wedding_settings',
  },
  {
    up: migration_20260906_231902_venues_events.up,
    down: migration_20260906_231902_venues_events.down,
    name: '20260906_231902_venues_events',
  },
  {
    up: migration_20260906_232915_content_model.up,
    down: migration_20260906_232915_content_model.down,
    name: '20260906_232915_content_model',
  },
  {
    up: migration_20260907_002348_rsvp_collections.up,
    down: migration_20260907_002348_rsvp_collections.down,
    name: '20260907_002348_rsvp_collections',
  },
  {
    up: migration_20260907_074800_payload_kv.up,
    down: migration_20260907_074800_payload_kv.down,
    name: '20260907_074800_payload_kv',
  },
  {
    up: migration_20260907_140329_registry_visibility.up,
    down: migration_20260907_140329_registry_visibility.down,
    name: '20260907_140329_registry_visibility',
  },
  {
    up: migration_20260908_003901_add_homepage_video.up,
    down: migration_20260908_003901_add_homepage_video.down,
    name: '20260908_003901_add_homepage_video'
  },
];
