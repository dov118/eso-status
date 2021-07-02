import {EsoStatus} from "../lib";

const url = 'https://help.elderscrollsonline.com/app/answers/detail/a_id/4320';

const raw_exemples = [
    {
        index: 1,
        rawStatus: "The issues affecting purchases in the ESO store have been resolved.",
        slugs: ['eso_store'],
        status: 'up',
    },
    {
        index: 2,
        rawStatus: "The Crown Store is currently available.",
        slugs: ['crown_store'],
        status: 'up',
    },
    {
        index: 3,
        rawStatus: "The ESO Forums are currently available.",
        slugs: ['web_forum'],
        status: 'up',
    },
    {
        index: 4,
        rawStatus: "The European PlayStation® megaserver is currently unavailable while we perform maintenance.",
        slugs: ['ps_eu'],
        status: 'down',
    },
    {
        index: 5,
        rawStatus: "The European PlayStation® megaserver is currently available.",
        slugs: ['ps_eu'],
        status: 'up',
    },
    {
        index: 6,
        rawStatus: "The North American PlayStation® megaserver is currently unavailable while we perform maintenance.",
        slugs: ['ps_na'],
        status: 'down',
    },
    {
        index: 7,
        rawStatus: "The North American PlayStation® megaserver is currently available.",
        slugs: ['ps_na'],
        status: 'up',
    },
    {
        index: 8,
        rawStatus: "The PlayStation® Network is currently experiencing a service interruption.",
        slugs: ['ps_na', 'ps_eu'],
        status: 'issues',
    },
    {
        index: 9,
        rawStatus: "The PlayStation® Network service interruption has been resolved.",
        slugs: ['ps_na', 'ps_eu'],
        status: 'up',
    },
    {
        index: 10,
        rawStatus: "The North American Xbox megaserver is currently unavailable while we perform maintenance.",
        slugs: ['xbox_na'],
        status: 'down',
    },
    {
        index: 11,
        rawStatus: "The European Xbox megaserver is currently unavailable while we perform maintenance.",
        slugs: ['xbox_eu'],
        status: 'down',
    },
    {
        index: 12,
        rawStatus: "The ESO store and account system are currently unavailable while we perform maintenance.",
        slugs: ['eso_store', 'account_system'],
        status: 'down',
    },
    {
        index: 13,
        rawStatus: "The ESO store and account system are currently available.",
        slugs: ['eso_store', 'account_system'],
        status: 'up',
    },
    {
        index: 14,
        rawStatus: "The European megaservers are currently unavailable while we perform maintenance.",
        slugs: ['pc_eu', 'xbox_eu', 'ps_eu'],
        status: 'down',
    },
    {
        index: 15,
        rawStatus: "The European megaservers are currently available.",
        slugs: ['pc_eu', 'xbox_eu', 'ps_eu'],
        status: 'up',
    },
    {
        index: 16,
        rawStatus: "The North American megaservers are currently unavailable while we perform maintenance.",
        slugs: ['pc_na', 'xbox_na', 'ps_na'],
        status: 'down',
    },
    {
        index: 17,
        rawStatus: "The North American megaservers are currently available.",
        slugs: ['pc_na', 'xbox_na', 'ps_na'],
        status: 'up',
    },
    {
        index: 18,
        rawStatus: "The ESO Website is currently unavailable while we perform maintenance.",
        slugs: ['site_web'],
        status: 'down',
    },
    {
        index: 19,
        rawStatus: "The ESO Website is currently online.",
        slugs: ['site_web'],
        status: 'up',
    },
    {
        index: 20,
        rawStatus: "The PTS is currently unavailable while we perform maintenance.",
        slugs: ['pts'],
        status: 'down',
    },
    {
        index: 21,
        rawStatus: "The PTS is currently available.",
        slugs: ['pts'],
        status: 'up',
    },
    {
        index: 22,
        rawStatus: "The European PC/Mac megaserver is currently unavailable while we perform maintenance.",
        slugs: ['pc_eu'],
        status: 'down',
    },
    {
        index: 23,
        rawStatus: "The European PC/Mac megaserver is currently available.",
        slugs: ['pc_eu'],
        status: 'up',
    },
    {
        index: 24,
        rawStatus: "We are currently investigating issues some players are having logging into the European PC/Mac megaserver.",
        slugs: ['pc_eu'],
        status: 'issues',
    },
    {
        index: 25,
        rawStatus: "The issues related to logging in to the European PC/Mac megaserver have been resolved at this time.",
        slugs: ['pc_eu'],
        status: 'up',
    },
    {
        index: 26,
        rawStatus: "The North American PC/Mac megaserver is currently unavailable while we perform maintenance.",
        slugs: ['pc_na'],
        status: 'down',
    },
    {
        index: 27,
        rawStatus: "The North American PC/Mac megaserver is currently available.",
        slugs: ['pc_na'],
        status: 'up',
    },
    {
        index: 28,
        rawStatus: "Xbox Live™ is currently experiencing a service interruption.",
        slugs: ['xbox_na', 'xbox_eu'],
        status: 'issues',
    },
    {
        index: 29,
        rawStatus: "The Xbox Live™ service interruption has been resolved.",
        slugs: ['xbox_na', 'xbox_eu'],
        status: 'up',
    },
    {
        index: 30,
        rawStatus: "We are currently investigating issues some players are having logging into the North American and European PC/Mac megaservers.",
        slugs: ['pc_na', 'pc_eu'],
        status: 'issues',
    },
    {
        index: 31,
        rawStatus: "We are currently investigating issues some players are having logging into the megaservers.",
        slugs: ['pc_na', 'pc_eu', 'xbox_na', 'xbox_eu', 'ps_na', 'ps_eu'],
        status: 'issues',
    },
    {
        index: 32,
        rawStatus: "The issues related to logging in to the megaservers have been resolved at this time.",
        slugs: ['pc_na', 'pc_eu', 'xbox_na', 'xbox_eu', 'ps_na', 'ps_eu'],
        status: 'up',
    },
    {
        index: 33,
        rawStatus: "We are currently investigating issues some players are having on the North American PC/Mac megaserver.",
        slugs: ['pc_na'],
        status: 'issues',
    },
    {
        index: 34,
        rawStatus: "The European Xbox megaserver is currently available.",
        slugs: ['xbox_eu'],
        status: 'up',
    },
    {
        index: 35,
        rawStatus: "The North American Xbox megaserver is currently available.",
        slugs: ['xbox_na'],
        status: 'up',
    },
    {
        index: 36,
        rawStatus: "We are currently investigating issues some players are having logging into the North American megaservers.",
        slugs: ['pc_na', 'xbox_na', 'ps_na'],
        status: 'issues',
    },
    {
        index: 37,
        rawStatus: "The issues related to logging in to the North American megaservers have been resolved at this time.",
        slugs: ['pc_na', 'xbox_na', 'ps_na'],
        status: 'up',
    },
]

const slug_zone_support_exemples = [
    { slug: 'pc_eu', zone: 'eu', support: 'pc' },
    { slug: 'pc_na', zone: 'na', support: 'pc' },
    { slug: 'ps_eu', zone: 'eu', support: 'ps' },
    { slug: 'ps_na', zone: 'na', support: 'ps' },
    { slug: 'xbox_eu', zone: 'eu', support: 'xbox' },
    { slug: 'xbox_na', zone: 'na', support: 'xbox' },
    { slug: 'site_web', zone: 'none', support: 'none' },
    { slug: 'pts', zone: 'none', support: 'none' },
    { slug: 'web_forum', zone: 'none', support: 'none' },
    { slug: 'crown_store', zone: 'none', support: 'none' },
    { slug: 'eso_store', zone: 'none', support: 'none' },
    { slug: 'account_system', zone: 'none', support: 'none' },
];

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
                    'ps_eu'
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
                    'ps_na'
                ],
                serverStatus: 'up'
            },
            {
                raw: "The European megaservers are currently available.",
                serverSlug: [
                    'pc_eu',
                    'xbox_eu',
                    'ps_eu'
                ],
                serverStatus: 'up'
            }
        ]);
    });
});

describe('getInformationLineServerSlug', function () {
    raw_exemples.forEach((exemple: any): void => {
        it(`check format (${exemple.index}) - (${exemple.rawStatus})`, function() {
            const slug = EsoStatus.getInformationLineServerSlug(exemple.rawStatus);

            expect(slug).toEqual(exemple.slugs);
        });
    });
});

describe('getInformationLineServerStatus', function () {
    raw_exemples.forEach((exemple: any): void => {
        it(`check format (${exemple.index}) - (${exemple.rawStatus})`, function() {
            const status = EsoStatus.getInformationLineServerStatus(exemple.rawStatus);

            expect(status).toEqual(exemple.status);
        });
    });
});

describe('getInformationLineServerZone', function () {
    slug_zone_support_exemples.forEach((exemple: any): void => {
        it(`check format - (${exemple.slug})`, function() {
            const zone = EsoStatus.getInformationLineServerZone(exemple.slug);

            expect(zone).toEqual(exemple.zone);
        });
    });
});

describe('getInformationLineServerSupport', function () {
    slug_zone_support_exemples.forEach((exemple: any): void => {
        it(`check format - (${exemple.slug})`, function() {
            const support = EsoStatus.getInformationLineServerSupport(exemple.slug);

            expect(support).toEqual(exemple.support);
        });
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
