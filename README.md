# ESO-STATUS
Eso-status is a library for getting and formatting data can founded in [https://help.elderscrollsonline.com/app/answers/detail/a_id/4320](https://help.elderscrollsonline.com/app/answers/detail/a_id/4320)

## Table of Contents
- [How to get it ?](#how-to-get-it-)
- [How to use it ?](#how-to-use-it-)
- [Returned data format](#returned-data-format-)

### How to get it ?
[![NPM](https://nodei.co/npm/@dov118/eso-status.png?downloads=true&downloadRank=true)](https://nodei.co/npm/@dov118/eso-status)

[![npm version](https://img.shields.io/npm/v/@dov118/eso-status.svg)](https://www.npmjs.com/package/@dov118/eso-status)
[![Downloads](https://img.shields.io/npm/dm/@dov118/eso-status.svg)](https://www.npmjs.com/package/@dov118/eso-status)
[![Dependency Status](https://status.david-dm.org/gh/dov118/eso-status.svg)](https://status.david-dm.org/gh/dov118/eso-status)
[![devDependency Status](https://status.david-dm.org/gh/dov118/eso-status.svg?type=dev)](https://david-dm.org/dov118/eso-status#info=devDependencies)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/dov118/eso-status.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/dov118/eso-status/context:javascript)

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
const {EsoStatus} = require("@dov118/eso-status");

EsoStatus.getEsoStatus().then(function (data) {

}).catch(function (error) {

});
```

### Returned data format ?
```text
[
  eso_store: {
    raw_date: '2021.06.03 - 13:10 UTC (9:10 EDT)',
    raw_information: 'The ESO store and account system are currently available.',
    date: '2021-06-03T13:10:00.000Z',
    slug: 'eso_store',
    support: 'none',
    zone: 'none',
    status: 'up'
  },
  account_system: {
    raw_date: '2021.06.03 - 13:10 UTC (9:10 EDT)',
    raw_information: 'The ESO store and account system are currently available.',
    date: '2021-06-03T13:10:00.000Z',
    slug: 'account_system',
    support: 'none',
    zone: 'none',
    status: 'up'
  },
  xbox_na: {
    raw_date: '2021.06.02 - 15:45 UTC (11:45 EST)',
    raw_information: 'The North American Xbox megaserver is currently available.',
    date: '2021-06-02T15:45:00.000Z',
    slug: 'xbox_na',
    support: 'xbox',
    zone: 'na',
    status: 'up'
  },
  xbox_eu: {
    raw_date: '2021.06.02 - 15:45 UTC (11:45 EST)',
    raw_information: 'The European Xbox megaserver is currently available.',
    date: '2021-06-02T15:45:00.000Z',
    slug: 'xbox_eu',
    support: 'xbox',
    zone: 'eu',
    status: 'up'
  },
  pc_na: {
    raw_date: '2021.06.02 - 14:30 UTC (10:30 EDT)',
    raw_information: 'The North American PC/Mac megaserver is currently available.',
    date: '2021-06-02T14:30:00.000Z',
    slug: 'pc_na',
    support: 'pc',
    zone: 'na',
    status: 'up'
  },
  ps_na: {
    raw_date: '2021.06.02 - 9:45 UTC (5:45 EST)',
    raw_information: 'The North American PlayStation® megaserver is currently available.',
    date: '2021-06-02T09:45:00.000Z',
    slug: 'ps_na',
    support: 'ps',
    zone: 'na',
    status: 'up'
  },
  ps_eu: {
    raw_date: '2021.06.02 - 9:45 UTC (5:45 EST)',
    raw_information: 'The European PlayStation® megaserver is currently available.',
    date: '2021-06-02T09:45:00.000Z',
    slug: 'ps_eu',
    support: 'ps',
    zone: 'eu',
    status: 'up'
  },
  pc_eu: {
    raw_date: '2021.06.01 - 10:20 UTC (6:20 EDT)',
    raw_information: 'The European PC/Mac megaserver is currently available.',
    date: '2021-06-01T10:20:00.000Z',
    slug: 'pc_eu',
    support: 'pc',
    zone: 'eu',
    status: 'up'
  },
  pts: {
    raw_date: '2021.05.17 - 16:00 UTC (12:00 EDT)',
    raw_information: 'The PTS is currently available.',
    date: '2021-05-17T16:00:00.000Z',
    slug: 'pts',
    support: 'none',
    zone: 'none',
    status: 'up'
  },
  site_web: {
    raw_date: '2021.01.14 - 14:45 UTC (9:45 EST)',
    raw_information: 'The ESO Website is currently online.',
    date: '2021-01-14T14:45:00.000Z',
    slug: 'site_web',
    support: 'none',
    zone: 'none',
    status: 'up'
  }
]

```
