import { Response } from 'request';
import Request = require('request');

/***
 * Methode used to get raw content of the website
 *
 * @return Promise<string> Raw content of the website
 */
const getWebSiteContent = (): Promise<string> => {
    return new Promise<string>((resolve: (value: string) => void, reject: (error: Error | any) => void): void => {
        Request.get(
            'https://help.elderscrollsonline.com/app/answers/detail/a_id/4320/~/service-alerts',
            {},
            (error: any, response: Response, body: string): void => {
                if (error) {
                    reject(new Error(error));
                } else {
                    if (response?.statusCode !== 200) {
                        reject(new Error(`Bad response ${response?.statusCode} (${body})`));
                    } else {
                        resolve(body);
                    }
                }
            },
        );
    });
};

/***
 * Methode used to get raw list content
 *
 * @param rawContent string Raw content of the website
 * @return string Raw list content of the website
 */
const getRawListContent = (rawContent: string): string => {
    return /<div><!-- ENTER ESO SERVICE ALERTS BELOW THIS LINE -->.*?<p>&nbsp;<\/p>/s.exec(rawContent)?.join('') ?? '';
};

/**
 * Methode used to get raw content list from list content
 *
 * @param rawListContent string Raw list content of the website
 * @return InformationBlock[] Raw content list from list content
 */
const getRawContentItemList = (rawListContent: string): InformationBlock[] => {
    const rawContentItemList: InformationBlock[] = [];
    const regex: RegExp = /.*?<hr \/>/gs;
    let m;
    // tslint:disable-next-line:no-conditional-assignment
    while ((m = regex.exec(rawListContent)) !== null) {
        m.forEach((match: string): void => {
            rawContentItemList.push({
                raw: match,
            });
        });
    }

    return rawContentItemList;
};

/**
 * Methode used to get raw lines from raw content list
 *
 * @param rawContentItemList InformationBlock[] Raw content list from list content
 * @return InformationBlock[] Raw lines from raw content list
 */
const getRawContentItemLines = (rawContentItemList: InformationBlock[]): InformationBlock[] => {
    return rawContentItemList.map(
        (item: InformationBlock): InformationBlock => {
            // @ts-ignore
            item.information_lines = [];
            const regex: RegExp = /<p>(.*?)<\/p>/gs;
            let m;
            let index: number = 0;

            // tslint:disable-next-line:no-conditional-assignment
            while ((m = regex.exec(item.raw)) !== null) {
                m.forEach((match: string): void => {
                    if (!match.includes('<p>')) {
                        if (index === 0) {
                            item.date_line = {
                                raw: match,
                            };
                        } else {
                            item.information_lines?.push({
                                raw: match,
                            });
                        }
                    }
                });
                index++;
            }
            return item;
        },
    );
};

/**
 * Methode used to get all information blocks from raw list content of the website
 *
 * @param rawListContent string Raw list content of the website
 * @return RawContentListItem[] All information blocks
 */
const getBlocks = (rawListContent: string): InformationBlock[] => {
    return getRawContentItemLines(getRawContentItemList(rawListContent));
};

/**
 * Methode used to get data of each blocks
 *
 * @param informationBlocks InformationBlock[] All information blocks
 * @return InformationBlock[] All information blocks with data
 */
const getBlocksData = (informationBlocks: InformationBlock[]): InformationBlock[] => {
    return informationBlocks.map(
        (informationBlock: InformationBlock): InformationBlock => {
            informationBlock.date_line = getBlocksDate(informationBlock.date_line);
            informationBlock.information_lines = getBlockInformation(informationBlock.information_lines);

            return informationBlock;
        },
    );
};

/**
 * Methode used to get correct date from information block
 *
 * @param dateLine string Line of block with raw date information
 * @return DateLine Line of block with date information
 */
const getBlocksDate = (dateLine: DateLine | undefined): DateLine | undefined => {
    if (dateLine) {
        // @ts-ignore
        const year: string = /([0-9]{4})/.exec(dateLine.raw)[1] ?? '';
        // @ts-ignore
        let month: string = /[0-9]{4}.([0-9]{1,2})/.exec(dateLine.raw)[1] ?? '';
        month = month.length === 2 ? month : `0${month}`;
        // @ts-ignore
        let day: string = /[0-9]{4}.[0-9]{1,2}.([0-9]{1,2})/.exec(dateLine.raw)[1] ?? '';
        day = day.length === 2 ? day : `0${day}`;
        // @ts-ignore
        let hour: string = /[0-9]{4}.[0-9]{1,2}.[0-9]{1,2} - ([0-9]{1,2})/.exec(dateLine.raw)[1] ?? '';
        hour = hour.length === 2 ? hour : `0${hour}`;
        // @ts-ignore
        let minute: string = /[0-9]{4}.[0-9]{1,2}.[0-9]{1,2} - [0-9]{1,2}:([0-9]{1,2})/.exec(dateLine.raw)[1] ?? '';
        minute = minute.length === 2 ? minute : `0${minute}`;

        dateLine.data = `${year}-${month}-${day}T${hour}:${minute}:00.000Z`;
    }

    return dateLine;
};

/**
 * Methode used to get line information data
 *
 * @param informationLines InformationLine[] Lines of line information
 * @return InformationLine[] Lines of line information with data
 */
const getBlockInformation = (informationLines: InformationLine[] | undefined): InformationLine[] | undefined => {
    return informationLines?.map(
        (informationLine: InformationLine): InformationLine => {
            // Get ESO server line slug
            informationLine.serverSlug = getInformationLineServerSlug(informationLine.raw);

            // Get ESO server line status
            informationLine.serverStatus = getInformationLineServerStatus(informationLine.raw);

            return informationLine;
        },
    );
};

/**
 * Methode used to get ESO server line slug
 *
 * @param raw Raw information of line
 * @return ServerSlug[] list of slug of the line
 */
const getInformationLineServerSlug = (raw: string): ServerSlug[] => {
    const slugs: ServerSlug[] = [];

    if (raw.includes('Xbox One megaserver')) {
        if (raw.includes('North American')) {
            slugs.push('xbox_na');
        } else if (raw.includes('European')) {
            slugs.push('xbox_eu');
        } else {
            slugs.push('xbox_na');
            slugs.push('xbox_eu');
        }
    } else if (raw.includes('PlayStation®4 megaserver')) {
        if (raw.includes('North American')) {
            slugs.push('ps4_na');
        } else if (raw.includes('European')) {
            slugs.push('ps4_eu');
        } else {
            slugs.push('ps4_na');
            slugs.push('ps4_eu');
        }
    } else if (raw.includes('PC/Mac megaserver')) {
        if (raw.includes('North American')) {
            slugs.push('pc_na');
        } else if (raw.includes('European')) {
            slugs.push('pc_eu');
        } else {
            slugs.push('pc_na');
            slugs.push('pc_eu');
        }
    } else if (raw.includes('European megaservers')) {
        slugs.push('pc_eu');
        slugs.push('xbox_eu');
        slugs.push('ps4_eu');
    } else if (raw.includes('North American megaservers')) {
        slugs.push('pc_na');
        slugs.push('xbox_na');
        slugs.push('ps4_na');
    } else if (raw.includes('ESO Website')) {
        slugs.push('site_web');
    } else if (raw.includes('PTS')) {
        slugs.push('pts');
    } else if (raw.includes('ESO Forums')) {
        slugs.push('web_forum');
    } else if (raw.includes('megaservers')) {
        slugs.push('pc_eu');
        slugs.push('xbox_eu');
        slugs.push('ps4_eu');
        slugs.push('pc_na');
        slugs.push('xbox_na');
        slugs.push('ps4_na');
    } else if (raw.includes('Crown Store')) {
        slugs.push('crown_store');
    } else if (raw.includes('ESO store') || raw.includes('ESO Store')) {
        if (raw.includes('account system')) {
            slugs.push('account_system');
        }
        slugs.push('eso_store');
    } else if (raw.includes('account system')) {
        if (raw.includes('ESO store') || raw.includes('ESO Store')) {
            slugs.push('eso_store');
        }
        slugs.push('account_system');
    } else if (raw.includes('PlayStation® Network')) {
        slugs.push('ps4_na');
        slugs.push('ps4_eu');
    }

    return slugs;
};

/**
 * Methode used to get ESO server line status
 *
 * @param raw Raw information of line
 * @return ServerStatus Status of the line
 */
const getInformationLineServerStatus = (raw: string): ServerStatus => {
    if (raw.includes('unavailable') || raw.includes('interruption')) {
        return 'down';
    } else if (raw.includes('available') || raw.includes('online') || raw.includes('resolved')) {
        return 'up';
    } else if (raw.includes('currently investigating')) {
        return 'issues';
    }

    return 'down';
};

/**
 * Methode used to get server zone from raw line data
 *
 * @param serverSlug ServerSlug Server slug
 * @return ServerZone Server zone from line data
 */
const getInformationLineServerZone = (serverSlug: ServerSlug): ServerZone => {
    if (serverSlug.includes('eu')) {
        return 'eu';
    } else if (serverSlug.includes('na')) {
        return 'na';
    }

    return 'none';
};

/**
 * Methode used to get server support from raw line data
 *
 * @param serverSlug ServerSlug Server slug
 * @return ServerSupport Server support from line data
 */
const getInformationLineServerSupport = (serverSlug: ServerSlug): ServerSupport => {
    if (serverSlug.includes('pc')) {
        return 'pc';
    } else if (serverSlug.includes('ps4')) {
        return 'ps4';
    } else if (serverSlug.includes('xbox')) {
        return 'xbox';
    }

    return 'none';
};

/**
 * Methode used to get last information foreach server/service
 *
 * @param informationBlock InformationBlock[]
 * @return EsoServer[] Server/service information list
 */
const getLastForEachServer = (informationBlock: InformationBlock[]): EsoServer[] => {
    const esoServerList: EsoServer[] = [];

    // tslint:disable-next-line:no-shadowed-variable
    informationBlock.forEach((informationBlock: InformationBlock): void => {
        informationBlock.information_lines?.forEach((informationLine: InformationLine): void => {
            informationLine.serverSlug?.forEach((serverSlug: ServerSlug): void => {
                // @ts-ignore
                if (esoServerList[serverSlug] === undefined) {
                    // @ts-ignore
                    esoServerList[serverSlug] = {
                        raw_date: informationBlock.date_line?.raw,
                        raw_information: informationLine.raw,
                        date: informationBlock.date_line?.data,
                        slug: serverSlug,
                        support: getInformationLineServerSupport(serverSlug),
                        zone: getInformationLineServerZone(serverSlug),
                        status: informationLine.serverStatus,
                    };
                }
            });
        });
    });

    return esoServerList;
};

/**
 * Methode used to get readable content of the website
 *
 * @return EsoServer[] Readable content of the website
 */
const getEsoStatus = (): Promise<EsoServer[]> => {
    return new Promise<EsoServer[]>((resolve, reject) => {
        // Raw content of the website
        getWebSiteContent()
            .then((rawContent: string): void => {
                // Get raw list content
                const rawListContent: string = getRawListContent(rawContent);

                // Get all information blocks from raw list content of the website
                let informationBlocks: InformationBlock[] = getBlocks(rawListContent);

                // Get all information blocks from raw list content of the website
                informationBlocks = getRawContentItemLines(informationBlocks);

                // Get data of each blocks
                informationBlocks = getBlocksData(informationBlocks);

                // Get all last information foreach servers
                resolve(getLastForEachServer(informationBlocks));
            })
            .catch(reject);
    });
};

/**
 * Methode to used to get status list ESO servers
 *
 * @type Promise<EsoServer[]>
 */
export const EsoStatus: Promise<EsoServer[]> = getEsoStatus();

/**
 * Format of element from raw content list
 */
interface InformationBlock {
    /**
     * Raw content of block
     *
     * @type string
     */
    raw: string;
    /**
     * Element of date line
     *
     * @type DateLine
     */
    date_line?: DateLine;
    /**
     * Element of information lines
     *
     * @type InformationLine
     */
    information_lines?: InformationLine[];
}

/**
 * Element of date line
 */
interface DateLine {
    /**
     * Raw content of the line
     *
     * @type string
     */
    raw: string;
    /**
     * Date correctly formatted
     *
     * @type string
     */
    data?: string;
}

/**
 * Element of information lines
 */
interface InformationLine {
    /**
     * Raw content of the line
     *
     * @type string
     */
    raw: string;
    /**
     * Server slug list from line information
     *
     * @type ServerSlug[]
     */
    serverSlug?: ServerSlug[];
    /**
     * Server status from line information
     *
     * @type ServerStatus
     */
    serverStatus?: ServerStatus;
}

/**
 * Eso Server/Status
 */
export interface EsoServer {
    /**
     * Raw content of the date line
     *
     * @type string
     */
    raw_date: string;
    /**
     * Raw content of the server/service line
     *
     * @type string
     */
    raw_information: string;
    /**
     * Date of last information form this server/service
     *
     * @type string
     */
    date: string;
    /**
     * Slug of this server/service
     *
     * @type ServerSlug
     */
    slug: ServerSlug;
    /**
     * Support of this server/service
     *
     * @type ServerZone
     */
    support: ServerZone;
    /**
     * Zone of this server/service
     *
     * @type ServerSupport
     */
    zone: ServerSupport;
    /**
     * Status of this server/service
     *
     * @type ServerStatus
     */
    status: ServerStatus;
}

/**
 * Server/service zone
 */
export type ServerZone = 'na' | 'eu' | 'none';

/**
 * Server/service support
 */
export type ServerSupport = 'xbox' | 'ps4' | 'pc' | 'none';

/**
 * Server/service slug
 */
type ServerSlug =
    | 'pc_eu'
    | 'pc_na'
    | 'ps4_eu'
    | 'ps4_na'
    | 'xbox_eu'
    | 'xbox_na'
    | 'site_web'
    | 'pts'
    | 'web_forum'
    | 'crown_store'
    | 'eso_store'
    | 'account_system';

/**
 * Server/service status
 */
export type ServerStatus = 'up' | 'down' | 'issues';
