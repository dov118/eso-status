import {EsoStatus} from "../lib";

const url = 'https://help.elderscrollsonline.com/app/answers/detail/a_id/4320';

describe('getWebSiteContent()', function() {
    it('check format', function() {
        EsoStatus.getWebSiteContent(url).then((data: any) => {
            expect(typeof data).toEqual('string');
        });
    });

    it('check content', function() {
        EsoStatus.getWebSiteContent(url).then((data: any) => {
            expect(data).toContain('<!-- ENTER ESO SERVICE ALERTS BELOW THIS LINE -->');
        });
    });
});

describe('getRawListContent()', function () {
    it('check format', function() {
        EsoStatus.getWebSiteContent(url).then((data: any) => {
            const result = EsoStatus.getRawListContent(data);

            expect(typeof result).toEqual('string');
        });
    });

    it('check content', function() {
        EsoStatus.getWebSiteContent(url).then((data: any) => {
            const result = EsoStatus.getRawListContent(data);

            expect(result).toContain('<div><!-- ENTER ESO SERVICE ALERTS BELOW THIS LINE -->');
        });
    });
});

describe('getRawContentItemList()', function () {
    it('check format', function () {
        EsoStatus.getWebSiteContent(url).then((data: any) => {
            const rawListContent = EsoStatus.getRawListContent(data);

            const result1 = EsoStatus.getRawContentItemList(rawListContent);

            expect(typeof result1).toEqual('object');
        });
    });
});

describe('getRawContentItemLines()', function () {
    it('check format', function () {
        EsoStatus.getWebSiteContent(url).then((data: any) => {
            const rawListContent = EsoStatus.getRawListContent(data);

            let informationBlocks = EsoStatus.getRawContentItemList(rawListContent);

            informationBlocks = EsoStatus.getRawContentItemLines(informationBlocks);

            expect(typeof informationBlocks).toEqual('object');
        });
    });
});

describe('getBlocks()', function () {
    it('check format', function () {
        EsoStatus.getWebSiteContent(url).then((data: any) => {
            const rawListContent = EsoStatus.getRawListContent(data);

            let informationBlocks = EsoStatus.getBlocks(rawListContent);

            expect(typeof informationBlocks).toEqual('object');
        });
    });
});

describe('getBlocks()', function () {
    it('check format', function () {
        EsoStatus.getWebSiteContent(url).then((data: any) => {
            const rawListContent = EsoStatus.getRawListContent(data);

            const informationBlocks = EsoStatus.getBlocks(rawListContent);

            expect(typeof informationBlocks).toEqual('object');
        });
    });
});

describe('getBlocksData()', function () {
    it('check format', function () {
        EsoStatus.getWebSiteContent(url).then((data: any) => {
            const rawListContent = EsoStatus.getRawListContent(data);

            let informationBlocks = EsoStatus.getRawContentItemList(rawListContent);

            informationBlocks = EsoStatus.getRawContentItemLines(informationBlocks);

            informationBlocks = EsoStatus.getBlocksData(informationBlocks);

            expect(typeof informationBlocks).toEqual('object');
        });
    });
});

describe('getBlocksDate()', function() {
    it('check format - (2021.01.14 - 12:00 UTC (7:00 EST))', function() {
        const initialDateLine = {
            raw: '2021.01.14 - 12:00 UTC (7:00 EST)'
        };

        const newDateLine = EsoStatus.getBlocksDate(initialDateLine);

        expect(newDateLine).toEqual({
            raw: '2021.01.14 - 12:00 UTC (7:00 EST)',
            data: '2021-01-14T12:00:00.000Z'
        })
    });

    it('check format - (2021.02.01 - 13:00 UTC (8:00 EST))', function() {
        const initialDateLine = {
            raw: '2021.02.01 - 13:00 UTC (8:00 EST)'
        };

        const newDateLine = EsoStatus.getBlocksDate(initialDateLine);

        expect(newDateLine).toEqual({
            raw: '2021.02.01 - 13:00 UTC (8:00 EST)',
            data: '2021-02-01T13:00:00.000Z'
        })
    });

    it('check format - (2021.01.26 - 08:00 UTC (03:00 EST))', function() {
        const initialDateLine = {
            raw: '2021.01.26 - 08:00 UTC (03:00 EST)'
        };

        const newDateLine = EsoStatus.getBlocksDate(initialDateLine);

        expect(newDateLine).toEqual({
            raw: '2021.01.26 - 08:00 UTC (03:00 EST)',
            data: '2021-01-26T08:00:00.000Z'
        })
    });
});

describe('getBlockInformation()', function () {
    it('check format - (We are currently investigating connection issues some players are having on the North American Xbox One megaserver.)', function () {
        const initialInformationLines = [{
            raw: "We are currently investigating connection issues some players are having on the North American Xbox One megaserver."
        }];

        const newInformationLines = EsoStatus.getBlockInformation(initialInformationLines);

        expect(typeof newInformationLines).toEqual('object');
        expect(newInformationLines).toEqual([
            {
                raw: "We are currently investigating connection issues some players are having on the North American Xbox One megaserver.",
                serverSlug: [
                    'xbox_na'
                ],
                serverStatus: 'issues'
            }
        ]);
    });

    it('check format - (The European megaservers are currently unavailable while we perform maintenance.)', function () {
        const initialInformationLines = [{
            raw: "The European megaservers are currently unavailable while we perform maintenance."
        }];

        const newInformationLines = EsoStatus.getBlockInformation(initialInformationLines);

        expect(typeof newInformationLines).toEqual('object');
        expect(newInformationLines).toEqual([
            {
                raw: "The European megaservers are currently unavailable while we perform maintenance.",
                serverSlug: [
                    'pc_eu',
                    'xbox_eu',
                    'ps4_eu'
                ],
                serverStatus: 'down'
            }
        ]);
    });

    it('check format - (The North American megaservers are currently available. - The European megaservers are currently available.)', function () {
        const initialInformationLines = [
            {
                raw: "The North American megaservers are currently available."
            }, {
                raw: "The European megaservers are currently available."
            }
        ];

        const newInformationLines = EsoStatus.getBlockInformation(initialInformationLines);

        expect(typeof newInformationLines).toEqual('object');
        expect(newInformationLines).toEqual([
            {
                raw: "The North American megaservers are currently available.",
                serverSlug: [
                    'pc_na',
                    'xbox_na',
                    'ps4_na'
                ],
                serverStatus: 'up'
            },
            {
                raw: "The European megaservers are currently available.",
                serverSlug: [
                    'pc_eu',
                    'xbox_eu',
                    'ps4_eu'
                ],
                serverStatus: 'up'
            }
        ]);
    });
});

describe('getInformationLineServerSlug', function () {
    it('check format - (The issues affecting purchases in the ESO store have been resolved.)', function() {
        const initialData = "The issues affecting purchases in the ESO store have been resolved.";

        const slug = EsoStatus.getInformationLineServerSlug(initialData);

        expect(slug).toEqual([
            'eso_store'
        ]);
    });

    it('check format - (The Crown Store is currently available.)', function() {
        const initialData = "The Crown Store is currently available.";

        const slug = EsoStatus.getInformationLineServerSlug(initialData);

        expect(slug).toEqual([
            'crown_store'
        ]);
    });

    it('check format - (The ESO Forums are currently available.)', function() {
        const initialData = "The ESO Forums are currently available.";

        const slug = EsoStatus.getInformationLineServerSlug(initialData);

        expect(slug).toEqual([
            'web_forum'
        ]);
    });

    it('check format - (We are currently investigating connection issues some players are having on the North American Xbox One megaserver.)', function() {
        const initialData = "We are currently investigating connection issues some players are having on the North American Xbox One megaserver.";

        const slug = EsoStatus.getInformationLineServerSlug(initialData);

        expect(slug).toEqual([
            'xbox_na'
        ]);
    });

    it('check format - (The European PlayStation®4 megaserver is currently unavailable while we perform maintenance.)', function() {
        const initialData = "The European PlayStation®4 megaserver is currently unavailable while we perform maintenance.";

        const slug = EsoStatus.getInformationLineServerSlug(initialData);

        expect(slug).toEqual([
            'ps4_eu'
        ]);
    });

    it('check format - (The European PlayStation®4 megaserver is currently available.)', function() {
        const initialData = "The European PlayStation®4 megaserver is currently available.";

        const slug = EsoStatus.getInformationLineServerSlug(initialData);

        expect(slug).toEqual([
            'ps4_eu'
        ]);
    });

    it('check format - (We are currently investigating issues some players are having logging into the European PlayStation®4 megaserver.)', function() {
        const initialData = "We are currently investigating issues some players are having logging into the European PlayStation®4 megaserver.";

        const slug = EsoStatus.getInformationLineServerSlug(initialData);

        expect(slug).toEqual([
            'ps4_eu'
        ]);
    });

    it('check format - (The issues related to logging in to the European PlayStation®4 megaserver have been resolved at this time.)', function() {
        const initialData = "The issues related to logging in to the European PlayStation®4 megaserver have been resolved at this time.";

        const slug = EsoStatus.getInformationLineServerSlug(initialData);

        expect(slug).toEqual([
            'ps4_eu'
        ]);
    });

    it('check format - (The North American PlayStation®4 megaserver is currently unavailable while we perform maintenance.)', function() {
        const initialData = "The North American PlayStation®4 megaserver is currently unavailable while we perform maintenance.";

        const slug = EsoStatus.getInformationLineServerSlug(initialData);

        expect(slug).toEqual([
            'ps4_na'
        ]);
    });

    it('check format - (The North American PlayStation®4 megaserver is currently available.)', function() {
        const initialData = "The North American PlayStation®4 megaserver is currently available.";

        const slug = EsoStatus.getInformationLineServerSlug(initialData);

        expect(slug).toEqual([
            'ps4_na'
        ]);
    });

    it('check format - (The PlayStation® Network is currently experiencing a service interruption.)', function() {
        const initialData = "The PlayStation® Network is currently experiencing a service interruption.";

        const slug = EsoStatus.getInformationLineServerSlug(initialData);

        expect(slug).toEqual([
            'ps4_na',
            'ps4_eu'
        ]);
    });

    it('check format - (The PlayStation® Network service interruption has been resolved.)', function() {
        const initialData = "The PlayStation® Network service interruption has been resolved.";

        const slug = EsoStatus.getInformationLineServerSlug(initialData);

        expect(slug).toEqual([
            'ps4_na',
            'ps4_eu'
        ]);
    });

    it('check format - (The North American Xbox One megaserver is currently unavailable while we perform maintenance.)', function() {
        const initialData = "The North American Xbox One megaserver is currently unavailable while we perform maintenance.";

        const slug = EsoStatus.getInformationLineServerSlug(initialData);

        expect(slug).toEqual([
            'xbox_na'
        ]);
    });

    it('check format - (The North American Xbox One megaserver is currently available.)', function() {
        const initialData = "The North American Xbox One megaserver is currently available.";

        const slug = EsoStatus.getInformationLineServerSlug(initialData);

        expect(slug).toEqual([
            'xbox_na'
        ]);
    });

    it('check format - (The European Xbox One megaserver is currently available.)', function() {
        const initialData = "The European Xbox One megaserver is currently available.";

        const slug = EsoStatus.getInformationLineServerSlug(initialData);

        expect(slug).toEqual([
            'xbox_eu'
        ]);
    });

    it('check format - (The connection issues for the North American Xbox One megaserver have been resolved at this time.)', function() {
        const initialData = "The connection issues for the North American Xbox One megaserver have been resolved at this time.";

        const slug = EsoStatus.getInformationLineServerSlug(initialData);

        expect(slug).toEqual([
            'xbox_na'
        ]);
    });

    it('check format - (The European Xbox One megaserver is currently unavailable while we perform maintenance.)', function() {
        const initialData = "The European Xbox One megaserver is currently unavailable while we perform maintenance.";

        const slug = EsoStatus.getInformationLineServerSlug(initialData);

        expect(slug).toEqual([
            'xbox_eu'
        ]);
    });

    it('check format - (The ESO store and account system are currently unavailable while we perform maintenance.)', function() {
        const initialData = "The ESO store and account system are currently unavailable while we perform maintenance.";

        const slug = EsoStatus.getInformationLineServerSlug(initialData);

        expect(slug).toEqual([
            'eso_store',
            'account_system'
        ]);
    });

    it('check format - (The ESO store and account system are currently available.)', function() {
        const initialData = "The ESO store and account system are currently available.";

        const slug = EsoStatus.getInformationLineServerSlug(initialData);

        expect(slug).toEqual([
            'eso_store',
            'account_system'
        ]);
    });

    it('check format - (The European megaservers are currently unavailable while we perform maintenance.)', function() {
        const initialData = "The European megaservers are currently unavailable while we perform maintenance.";

        const slug = EsoStatus.getInformationLineServerSlug(initialData);

        expect(slug).toEqual([
            'pc_eu',
            'xbox_eu',
            'ps4_eu'
        ]);
    });

    it('check format - (The European megaservers are currently available.)', function() {
        const initialData = "The European megaservers are currently available.";

        const slug = EsoStatus.getInformationLineServerSlug(initialData);

        expect(slug).toEqual([
            'pc_eu',
            'xbox_eu',
            'ps4_eu'
        ]);
    });

    it('check format - (The North American megaservers are currently unavailable while we perform maintenance.)', function() {
        const initialData = "The North American megaservers are currently unavailable while we perform maintenance.";

        const slug = EsoStatus.getInformationLineServerSlug(initialData);

        expect(slug).toEqual([
            'pc_na',
            'xbox_na',
            'ps4_na'
        ]);
    });

    it('check format - (The North American megaservers are currently available.)', function() {
        const initialData = "The North American megaservers are currently available.";

        const slug = EsoStatus.getInformationLineServerSlug(initialData);

        expect(slug).toEqual([
            'pc_na',
            'xbox_na',
            'ps4_na'
        ]);
    });

    it('check format - (The ESO Website is currently unavailable while we perform maintenance.)', function() {
        const initialData = "The ESO Website is currently unavailable while we perform maintenance.";

        const slug = EsoStatus.getInformationLineServerSlug(initialData);

        expect(slug).toEqual([
            'site_web'
        ]);
    });

    it('check format - (The ESO Website is currently online.)', function() {
        const initialData = "The ESO Website is currently online.";

        const slug = EsoStatus.getInformationLineServerSlug(initialData);

        expect(slug).toEqual([
            'site_web'
        ]);
    });

    it('check format - (The PTS is currently unavailable while we perform maintenance.)', function() {
        const initialData = "The PTS is currently unavailable while we perform maintenance.";

        const slug = EsoStatus.getInformationLineServerSlug(initialData);

        expect(slug).toEqual([
            'pts'
        ]);
    });

    it('check format - (The PTS is currently available.)', function() {
        const initialData = "The PTS is currently available.";

        const slug = EsoStatus.getInformationLineServerSlug(initialData);

        expect(slug).toEqual([
            'pts'
        ]);
    });

    it('check format - (The European PC/Mac megaserver is currently unavailable while we perform maintenance.)', function() {
        const initialData = "The European PC/Mac megaserver is currently unavailable while we perform maintenance.";

        const slug = EsoStatus.getInformationLineServerSlug(initialData);

        expect(slug).toEqual([
            'pc_eu'
        ]);
    });

    it('check format - (The European PC/Mac megaserver is currently available.)', function() {
        const initialData = "The European PC/Mac megaserver is currently available.";

        const slug = EsoStatus.getInformationLineServerSlug(initialData);

        expect(slug).toEqual([
            'pc_eu'
        ]);
    });

    it('check format - (We are currently investigating issues some players are having logging into the European PC/Mac megaserver.)', function() {
        const initialData = "We are currently investigating issues some players are having logging into the European PC/Mac megaserver.";

        const slug = EsoStatus.getInformationLineServerSlug(initialData);

        expect(slug).toEqual([
            'pc_eu'
        ]);
    });

    it('check format - (The issues related to logging in to the European PC/Mac megaserver have been resolved at this time.)', function() {
        const initialData = "The issues related to logging in to the European PC/Mac megaserver have been resolved at this time.";

        const slug = EsoStatus.getInformationLineServerSlug(initialData);

        expect(slug).toEqual([
            'pc_eu'
        ]);
    });

    it('check format - (The North American PC/Mac megaserver is currently unavailable while we perform maintenance.)', function() {
        const initialData = "The North American PC/Mac megaserver is currently unavailable while we perform maintenance.";

        const slug = EsoStatus.getInformationLineServerSlug(initialData);

        expect(slug).toEqual([
            'pc_na'
        ]);
    });

    it('check format - (The North American PC/Mac megaserver is currently available.)', function() {
        const initialData = "The North American PC/Mac megaserver is currently available.";

        const slug = EsoStatus.getInformationLineServerSlug(initialData);

        expect(slug).toEqual([
            'pc_na'
        ]);
    });

    it('check format - (Xbox Live™ is currently experiencing a service interruption.)', function() {
        const initialData = "Xbox Live™ is currently experiencing a service interruption.";

        const slug = EsoStatus.getInformationLineServerSlug(initialData);

        expect(slug).toEqual([
            'xbox_na',
            'xbox_eu'
        ]);
    });

    it('check format - (The Xbox Live™ service interruption has been resolved.)', function() {
        const initialData = "The Xbox Live™ service interruption has been resolved.";

        const slug = EsoStatus.getInformationLineServerSlug(initialData);

        expect(slug).toEqual([
            'xbox_na',
            'xbox_eu'
        ]);
    });

    it('check format - (We are currently investigating issues some players are having logging into the North American and European PC/Mac megaservers.)', function() {
        const initialData = "We are currently investigating issues some players are having logging into the North American and European PC/Mac megaservers.";

        const slug = EsoStatus.getInformationLineServerSlug(initialData);

        expect(slug).toEqual([
            'pc_na',
            'pc_eu'
        ]);
    });

    it('check format - (We are currently investigating issues some players are having logging into the megaservers.)', function() {
        const initialData = "We are currently investigating issues some players are having logging into the megaservers.";

        const slug = EsoStatus.getInformationLineServerSlug(initialData);

        expect(slug).toEqual([
            'pc_na',
            'pc_eu',
            'xbox_na',
            'xbox_eu',
            'ps4_na',
            'ps4_eu'
        ]);
    });

    it('check format - (The issues related to logging in to the megaservers have been resolved at this time.)', function() {
        const initialData = "The issues related to logging in to the megaservers have been resolved at this time.";

        const slug = EsoStatus.getInformationLineServerSlug(initialData);

        expect(slug).toEqual([
            'pc_na',
            'pc_eu',
            'xbox_na',
            'xbox_eu',
            'ps4_na',
            'ps4_eu'
        ]);
    });

    it('check format - (We are currently investigating issues some players are having on the North American PC/Mac megaserver.)', function() {
        const initialData = "We are currently investigating issues some players are having on the North American PC/Mac megaserver.";

        const slug = EsoStatus.getInformationLineServerSlug(initialData);

        expect(slug).toEqual([
            'pc_na'
        ]);
    });

    it('check format - (We are currently investigating issues some players are having on the North American Xbox One megaserver.)', function() {
        const initialData = "We are currently investigating issues some players are having on the North American Xbox One megaserver.";

        const slug = EsoStatus.getInformationLineServerSlug(initialData);

        expect(slug).toEqual([
            'xbox_na'
        ]);
    });
});

describe('getInformationLineServerStatus', function () {
    it('check format - (The issues affecting purchases in the ESO store have been resolved.)', function() {
        const initialData = "The issues affecting purchases in the ESO store have been resolved.";

        const status = EsoStatus.getInformationLineServerStatus(initialData);

        expect(status).toEqual('up');
    });

    it('check format - (The Crown Store is currently available.)', function() {
        const initialData = "The Crown Store is currently available.";

        const status = EsoStatus.getInformationLineServerStatus(initialData);

        expect(status).toEqual('up');
    });

    it('check format - (The ESO Forums are currently available.)', function() {
        const initialData = "The ESO Forums are currently available.";

        const status = EsoStatus.getInformationLineServerStatus(initialData);

        expect(status).toEqual('up');
    });

    it('check format - (We are currently investigating connection issues some players are having on the North American Xbox One megaserver.)', function() {
        const initialData = "We are currently investigating connection issues some players are having on the North American Xbox One megaserver.";

        const status = EsoStatus.getInformationLineServerStatus(initialData);

        expect(status).toEqual('issues');
    });

    it('check format - (The European PlayStation®4 megaserver is currently unavailable while we perform maintenance.)', function() {
        const initialData = "The European PlayStation®4 megaserver is currently unavailable while we perform maintenance.";

        const status = EsoStatus.getInformationLineServerStatus(initialData);

        expect(status).toEqual('down');
    });

    it('check format - (The European PlayStation®4 megaserver is currently available.)', function() {
        const initialData = "The European PlayStation®4 megaserver is currently available.";

        const status = EsoStatus.getInformationLineServerStatus(initialData);

        expect(status).toEqual('up');
    });

    it('check format - (We are currently investigating issues some players are having logging into the European PlayStation®4 megaserver.)', function() {
        const initialData = "We are currently investigating issues some players are having logging into the European PlayStation®4 megaserver.";

        const status = EsoStatus.getInformationLineServerStatus(initialData);

        expect(status).toEqual('issues');
    });

    it('check format - (The issues related to logging in to the European PlayStation®4 megaserver have been resolved at this time.)', function() {
        const initialData = "The issues related to logging in to the European PlayStation®4 megaserver have been resolved at this time.";

        const status = EsoStatus.getInformationLineServerStatus(initialData);

        expect(status).toEqual('up');
    });

    it('check format - (The North American PlayStation®4 megaserver is currently unavailable while we perform maintenance.)', function() {
        const initialData = "The North American PlayStation®4 megaserver is currently unavailable while we perform maintenance.";

        const status = EsoStatus.getInformationLineServerStatus(initialData);

        expect(status).toEqual('down');
    });

    it('check format - (The North American PlayStation®4 megaserver is currently available.)', function() {
        const initialData = "The North American PlayStation®4 megaserver is currently available.";

        const status = EsoStatus.getInformationLineServerStatus(initialData);

        expect(status).toEqual('up');
    });

    it('check format - (The PlayStation® Network is currently experiencing a service interruption.)', function() {
        const initialData = "The PlayStation® Network is currently experiencing a service interruption.";

        const status = EsoStatus.getInformationLineServerStatus(initialData);

        expect(status).toEqual('issues');
    });

    it('check format - (The PlayStation® Network service interruption has been resolved.)', function() {
        const initialData = "The PlayStation® Network service interruption has been resolved.";

        const status = EsoStatus.getInformationLineServerStatus(initialData);

        expect(status).toEqual('up');
    });

    it('check format - (The North American Xbox One megaserver is currently unavailable while we perform maintenance.)', function() {
        const initialData = "The North American Xbox One megaserver is currently unavailable while we perform maintenance.";

        const status = EsoStatus.getInformationLineServerStatus(initialData);

        expect(status).toEqual('down');
    });

    it('check format - (The North American Xbox One megaserver is currently available.)', function() {
        const initialData = "The North American Xbox One megaserver is currently available.";

        const status = EsoStatus.getInformationLineServerStatus(initialData);

        expect(status).toEqual('up');
    });

    it('check format - (The European Xbox One megaserver is currently available.)', function() {
        const initialData = "The European Xbox One megaserver is currently available.";

        const status = EsoStatus.getInformationLineServerStatus(initialData);

        expect(status).toEqual('up');
    });

    it('check format - (The connection issues for the North American Xbox One megaserver have been resolved at this time.)', function() {
        const initialData = "The connection issues for the North American Xbox One megaserver have been resolved at this time.";

        const status = EsoStatus.getInformationLineServerStatus(initialData);

        expect(status).toEqual('up');
    });

    it('check format - (The European Xbox One megaserver is currently unavailable while we perform maintenance.)', function() {
        const initialData = "The European Xbox One megaserver is currently unavailable while we perform maintenance.";

        const status = EsoStatus.getInformationLineServerStatus(initialData);

        expect(status).toEqual('down');
    });

    it('check format - (The ESO store and account system are currently unavailable while we perform maintenance.)', function() {
        const initialData = "The ESO store and account system are currently unavailable while we perform maintenance.";

        const status = EsoStatus.getInformationLineServerStatus(initialData);

        expect(status).toEqual('down');
    });

    it('check format - (The ESO store and account system are currently available.)', function() {
        const initialData = "The ESO store and account system are currently available.";

        const status = EsoStatus.getInformationLineServerStatus(initialData);

        expect(status).toEqual('up');
    });

    it('check format - (The European megaservers are currently unavailable while we perform maintenance.)', function() {
        const initialData = "The European megaservers are currently unavailable while we perform maintenance.";

        const status = EsoStatus.getInformationLineServerStatus(initialData);

        expect(status).toEqual('down');
    });

    it('check format - (The European megaservers are currently available.)', function() {
        const initialData = "The European megaservers are currently available.";

        const status = EsoStatus.getInformationLineServerStatus(initialData);

        expect(status).toEqual('up');
    });

    it('check format - (The North American megaservers are currently unavailable while we perform maintenance.)', function() {
        const initialData = "The North American megaservers are currently unavailable while we perform maintenance.";

        const status = EsoStatus.getInformationLineServerStatus(initialData);

        expect(status).toEqual('down');
    });

    it('check format - (The North American megaservers are currently available.)', function() {
        const initialData = "The North American megaservers are currently available.";

        const status = EsoStatus.getInformationLineServerStatus(initialData);

        expect(status).toEqual('up');
    });

    it('check format - (The ESO Website is currently unavailable while we perform maintenance.)', function() {
        const initialData = "The ESO Website is currently unavailable while we perform maintenance.";

        const status = EsoStatus.getInformationLineServerStatus(initialData);

        expect(status).toEqual('down');
    });

    it('check format - (The ESO Website is currently online.)', function() {
        const initialData = "The ESO Website is currently online.";

        const status = EsoStatus.getInformationLineServerStatus(initialData);

        expect(status).toEqual('up');
    });

    it('check format - (The PTS is currently unavailable while we perform maintenance.)', function() {
        const initialData = "The PTS is currently unavailable while we perform maintenance.";

        const status = EsoStatus.getInformationLineServerStatus(initialData);

        expect(status).toEqual('down');
    });

    it('check format - (The PTS is currently available.)', function() {
        const initialData = "The PTS is currently available.";

        const status = EsoStatus.getInformationLineServerStatus(initialData);

        expect(status).toEqual('up');
    });

    it('check format - (The European PC/Mac megaserver is currently unavailable while we perform maintenance.)', function() {
        const initialData = "The European PC/Mac megaserver is currently unavailable while we perform maintenance.";

        const status = EsoStatus.getInformationLineServerStatus(initialData);

        expect(status).toEqual('down');
    });

    it('check format - (The European PC/Mac megaserver is currently available.)', function() {
        const initialData = "The European PC/Mac megaserver is currently available.";

        const status = EsoStatus.getInformationLineServerStatus(initialData);

        expect(status).toEqual('up');
    });

    it('check format - (We are currently investigating issues some players are having logging into the European PC/Mac megaserver.)', function() {
        const initialData = "We are currently investigating issues some players are having logging into the European PC/Mac megaserver.";

        const status = EsoStatus.getInformationLineServerStatus(initialData);

        expect(status).toEqual('issues');
    });

    it('check format - (The issues related to logging in to the European PC/Mac megaserver have been resolved at this time.)', function() {
        const initialData = "The issues related to logging in to the European PC/Mac megaserver have been resolved at this time.";

        const status = EsoStatus.getInformationLineServerStatus(initialData);

        expect(status).toEqual('up');
    });

    it('check format - (The North American PC/Mac megaserver is currently unavailable while we perform maintenance.)', function() {
        const initialData = "The North American PC/Mac megaserver is currently unavailable while we perform maintenance.";

        const status = EsoStatus.getInformationLineServerStatus(initialData);

        expect(status).toEqual('down');
    });

    it('check format - (The North American PC/Mac megaserver is currently available.)', function() {
        const initialData = "The North American PC/Mac megaserver is currently available.";

        const status = EsoStatus.getInformationLineServerStatus(initialData);

        expect(status).toEqual('up');
    });

    it('check format - (Xbox Live™ is currently experiencing a service interruption.)', function() {
        const initialData = "Xbox Live™ is currently experiencing a service interruption.";

        const status = EsoStatus.getInformationLineServerStatus(initialData);

        expect(status).toEqual('issues');
    });

    it('check format - (The Xbox Live™ service interruption has been resolved.)', function() {
        const initialData = "The Xbox Live™ service interruption has been resolved.";

        const status = EsoStatus.getInformationLineServerStatus(initialData);

        expect(status).toEqual('up');
    });

    it('check format - (We are currently investigating issues some players are having logging into the North American and European PC/Mac megaservers.)', function() {
        const initialData = "We are currently investigating issues some players are having logging into the North American and European PC/Mac megaservers.";

        const status = EsoStatus.getInformationLineServerStatus(initialData);

        expect(status).toEqual('issues');
    });

    it('check format - (We are currently investigating issues some players are having logging into the megaservers.)', function() {
        const initialData = "We are currently investigating issues some players are having logging into the megaservers.";

        const status = EsoStatus.getInformationLineServerStatus(initialData);

        expect(status).toEqual('issues');
    });

    it('check format - (The issues related to logging in to the megaservers have been resolved at this time.)', function() {
        const initialData = "The issues related to logging in to the megaservers have been resolved at this time.";

        const status = EsoStatus.getInformationLineServerStatus(initialData);

        expect(status).toEqual('up');
    });

    it('check format - (We are currently investigating issues some players are having on the North American PC/Mac megaserver.)', function() {
        const initialData = "We are currently investigating issues some players are having on the North American PC/Mac megaserver.";

        const status = EsoStatus.getInformationLineServerStatus(initialData);

        expect(status).toEqual('issues');
    });

    it('check format - (We are currently investigating issues some players are having on the North American Xbox One megaserver.)', function() {
        const initialData = "We are currently investigating issues some players are having on the North American Xbox One megaserver.";

        const status = EsoStatus.getInformationLineServerStatus(initialData);

        expect(status).toEqual('issues');
    });
});

describe('getInformationLineServerZone', function () {
    it('check format - (pc_eu)', function() {
        const zone = EsoStatus.getInformationLineServerZone('pc_eu');

        expect(zone).toEqual('eu');
    });

    it('check format - (pc_na)', function() {
        const zone = EsoStatus.getInformationLineServerZone('pc_na');

        expect(zone).toEqual('na');
    });

    it('check format - (ps4_eu)', function() {
        const zone = EsoStatus.getInformationLineServerZone('ps4_eu');

        expect(zone).toEqual('eu');
    });

    it('check format - (ps4_na)', function() {
        const zone = EsoStatus.getInformationLineServerZone('ps4_na');

        expect(zone).toEqual('na');
    });

    it('check format - (xbox_eu)', function() {
        const zone = EsoStatus.getInformationLineServerZone('xbox_eu');

        expect(zone).toEqual('eu');
    });

    it('check format - (xbox_na)', function() {
        const zone = EsoStatus.getInformationLineServerZone('xbox_na');

        expect(zone).toEqual('na');
    });

    it('check format - (site_web)', function() {
        const zone = EsoStatus.getInformationLineServerZone('site_web');

        expect(zone).toEqual('none');
    });

    it('check format - (pts)', function() {
        const zone = EsoStatus.getInformationLineServerZone('pts');

        expect(zone).toEqual('none');
    });

    it('check format - (web_forum)', function() {
        const zone = EsoStatus.getInformationLineServerZone('web_forum');

        expect(zone).toEqual('none');
    });

    it('check format - (crown_store)', function() {
        const zone = EsoStatus.getInformationLineServerZone('crown_store');

        expect(zone).toEqual('none');
    });

    it('check format - (eso_store)', function() {
        const zone = EsoStatus.getInformationLineServerZone('eso_store');

        expect(zone).toEqual('none');
    });

    it('check format - (account_system)', function() {
        const zone = EsoStatus.getInformationLineServerZone('account_system');

        expect(zone).toEqual('none');
    });
});

describe('getInformationLineServerSupport', function () {
    it('check format - (pc_eu)', function() {
        const support = EsoStatus.getInformationLineServerSupport('pc_eu');

        expect(support).toEqual('pc');
    });

    it('check format - (pc_na)', function() {
        const support = EsoStatus.getInformationLineServerSupport('pc_na');

        expect(support).toEqual('pc');
    });

    it('check format - (ps4_eu)', function() {
        const support = EsoStatus.getInformationLineServerSupport('ps4_eu');

        expect(support).toEqual('ps4');
    });

    it('check format - (ps4_na)', function() {
        const support = EsoStatus.getInformationLineServerSupport('ps4_na');

        expect(support).toEqual('ps4');
    });

    it('check format - (xbox_eu)', function() {
        const support = EsoStatus.getInformationLineServerSupport('xbox_eu');

        expect(support).toEqual('xbox');
    });

    it('check format - (xbox_na)', function() {
        const support = EsoStatus.getInformationLineServerSupport('xbox_na');

        expect(support).toEqual('xbox');
    });

    it('check format - (site_web)', function() {
        const support = EsoStatus.getInformationLineServerSupport('site_web');

        expect(support).toEqual('none');
    });

    it('check format - (pts)', function() {
        const support = EsoStatus.getInformationLineServerSupport('pts');

        expect(support).toEqual('none');
    });

    it('check format - (web_forum)', function() {
        const support = EsoStatus.getInformationLineServerSupport('web_forum');

        expect(support).toEqual('none');
    });

    it('check format - (crown_store)', function() {
        const support = EsoStatus.getInformationLineServerSupport('crown_store');

        expect(support).toEqual('none');
    });

    it('check format - (eso_store)', function() {
        const support = EsoStatus.getInformationLineServerSupport('eso_store');

        expect(support).toEqual('none');
    });

    it('check format - (account_system)', function() {
        const support = EsoStatus.getInformationLineServerSupport('account_system');

        expect(support).toEqual('none');
    });
});

describe('getLastForEachServer()', function () {
    it('check format', function () {
        EsoStatus.getWebSiteContent(url).then(data => {
            // Get raw list content
            const rawListContent = EsoStatus.getRawListContent(data);

            // Get all information blocks from raw list content of the website
            let informationBlocks = EsoStatus.getBlocks(rawListContent);

            // Get all information blocks from raw list content of the website
            informationBlocks = EsoStatus.getRawContentItemLines(informationBlocks);

            // Get data of each blocks
            informationBlocks = EsoStatus.getBlocksData(informationBlocks);

            const result = EsoStatus.getLastForEachServer(informationBlocks);

            expect(typeof result).toEqual('object');
        });
    });
});

describe('getEsoStatus()', function () {
    it('check format', function () {
        EsoStatus.getWebSiteContent(url).then(data => {
            // Get raw list content
            const rawListContent = EsoStatus.getRawListContent(data);

            // Get all information blocks from raw list content of the website
            let informationBlocks = EsoStatus.getBlocks(rawListContent);

            // Get all information blocks from raw list content of the website
            informationBlocks = EsoStatus.getRawContentItemLines(informationBlocks);

            // Get data of each blocks
            informationBlocks = EsoStatus.getBlocksData(informationBlocks);

            const result = EsoStatus.getLastForEachServer(informationBlocks);

            expect(typeof result).toEqual('object');
        });
    });
});
