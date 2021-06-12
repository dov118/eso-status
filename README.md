# ESO-STATUS
Eso-status is a library for getting and formatting data can founded in https://help.elderscrollsonline.com/app/answers/detail/a_id/4320/~/service-alerts

## Table of Contents
- [How to get it ?](#how-to-get-it-)
- [How to use it ?](#how-to-use-it-)
- [Returned data format](#returned-data-format-)

### How to get it ?
[![npm package](https://nodeico.herokuapp.com/@dov118/eso-status.svg)](https://nodei.co/npm/@dov118/eso-status/)

[![npm version](https://img.shields.io/npm/v/@dov118/eso-status.svg)](https://www.npmjs.com/package/@dov118/eso-status)
[![Downloads](https://img.shields.io/npm/dm/@dov118/eso-status.svg)](https://www.npmjs.com/package/@dov118/eso-status)

```shell
npm i @dov118/eso-status
```

### How to use it ?
- TypeScript
```typescript
import {EsoServer, EsoStatus} from "@dov118/eso-status";

EsoStatus.getEsoStatus().then((data: EsoServer[]): void => {

}).catch((error: Error): void => {

});
```
- JavaScript
```javascript
var EsoStatus = require("@dov118/eso-status");

EsoStatus.getEsoStatus().then(function (data) {

}).catch(function (error) {

});
```

### Returned data format ?
```text
[
  pts: {
    raw_date: '2020.12.16 - 15:45 UTC (10:45 EST)',
    raw_information: 'The PTS is currently available.',
    date: '2020-12-16T15:45:00.000Z',
    slug: 'pts',
    support: 'none',
    zone: 'none',
    status: 'up'
  },
  ps4_na: {
    raw_date: '2020.12.09 - 13:30 UTC (8:30 EST)',
    raw_information: 'The North American PlayStation®4 megaserver is currently available.',
    date: '2020-12-09T13:30:00.000Z',
    slug: 'ps4_na',
    support: 'ps4',
    zone: 'na',
    status: 'up'
  },
  ps4_eu: {
    raw_date: '2020.12.09 - 13:30 UTC (8:30 EST)',
    raw_information: 'The European PlayStation®4 megaserver is currently available.',
    date: '2020-12-09T13:30:00.000Z',
    slug: 'ps4_eu',
    support: 'ps4',
    zone: 'eu',
    status: 'up'
  },
  site_web: {
    raw_date: '2020.12.08 - 14:40 UTC (9:40 EST)',
    raw_information: 'The ESO Website is currently online.',
    date: '2020-12-08T14:40:00.000Z',
    slug: 'site_web',
    support: 'none',
    zone: 'none',
    status: 'up'
  },
  pc_na: {
    raw_date: '2020.12.7 - 12:35 UTC (7:35 EDT)',
    raw_information: 'The North American PC/Mac megaserver is currently available.',
    date: '2020-12-07T12:35:00.000Z',
    slug: 'pc_na',
    support: 'pc',
    zone: 'na',
    status: 'up'
  },
  pc_eu: {
    raw_date: '2020.12.7 - 12:35 UTC (7:35 EDT)',
    raw_information: 'The European PC/Mac megaserver is currently available.',
    date: '2020-12-07T12:35:00.000Z',
    slug: 'pc_eu',
    support: 'pc',
    zone: 'eu',
    status: 'up'
  },
  xbox_na: {
    raw_date: '2020.12.05 - 08:15 UTC (03:15 EST)',
    raw_information: 'The North American Xbox One megaserver is currently available.',
    date: '2020-12-05T08:15:00.000Z',
    slug: 'xbox_na',
    support: 'xbox',
    zone: 'na',
    status: 'up'
  },
  xbox_eu: {
    raw_date: '2020.12.05 - 08:15 UTC (03:15 EST)',
    raw_information: 'The European Xbox One megaserver is currently available.',
    date: '2020-12-05T08:15:00.000Z',
    slug: 'xbox_eu',
    support: 'xbox',
    zone: 'eu',
    status: 'up'
  },
  eso_store: {
    raw_date: '2020.12.03 - 19:05 UTC (14:05 EST)',
    raw_information: 'The issues affecting purchases in the ESO store have been resolved.',
    date: '2020-12-03T19:05:00.000Z',
    slug: 'eso_store',
    support: 'none',
    zone: 'none',
    status: 'up'
  },
  account_system: {
    raw_date: '2020.11.18 - 16:40 UTC (11:40 EST)',
    raw_information: 'The ESO store and account system are currently available.',
    date: '2020-11-18T16:40:00.000Z',
    slug: 'account_system',
    support: 'none',
    zone: 'none',
    status: 'up'
  },
  crown_store: {
    raw_date: '2020.11.03 - 18:30 UTC (13:30 EST)',
    raw_information: 'The Crown Store is currently available.',
    date: '2020-11-03T18:30:00.000Z',
    slug: 'crown_store',
    support: 'none',
    zone: 'none',
    status: 'up'
  },
  web_forum: {
    raw_date: '2020.07.17 - 22:15 UTC (18:15 EDT)',
    raw_information: 'The ESO Forums are currently available.',
    date: '2020-07-17T22:15:00.000Z',
    slug: 'web_forum',
    support: 'none',
    zone: 'none',
    status: 'up'
  }
]
```
