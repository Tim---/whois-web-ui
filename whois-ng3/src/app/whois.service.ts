import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface WhoisParams {
  query: string;
  type: string;
  personal: boolean;
  offset: number;
  limit: number;
}

class Group<T> {
  [key: string]: T[];
}

export function groupBy<T>(list:T[], func:(x:T)=>string): Group<T> {
  let res: Group<T> = {};
  for(const o of list) {
    const groupName = func(o);
    if(res[groupName] === undefined) {
      res[groupName] = [];
    }
    res[groupName].push(o);
  }
  return res
}


export interface SearchSource {
  id: string;
}

export interface SearchLink {
  type: string;
  href: string;
}

export interface SearchAttribute {
  name: string;
  value: string;
  link?: SearchLink;
  comment?: string;
  "referenced-type"?: string;
}

export interface SearchAttributes {
  attribute: SearchAttribute[];
}

export interface SearchTag {
  id: string;
}

export interface SearchTags {
  tag: SearchTag[];
}

export interface SearchObject {
  type: string;
  link: SearchLink;
  source: SearchSource;
  attributes: SearchAttributes;
  "primary-key": SearchAttributes;
  tags?: SearchTags;
}

export interface SearchObjects {
  object: SearchObject[];
}

export interface SearchErrorMessageArg {
  value: string;
}

export interface SearchErrorMessage {
  text: string;
  severity: string;
  args: SearchErrorMessageArg[];
}

export interface SearchErrorMessages {
  errormessage: SearchErrorMessage[];
}

export interface SearchSources {
  source: SearchSource[];
}

export interface SearchParameters {
  // TODO : more interfaces
  "inverse-lookup": any;
  "type-filters": any;
  flags: any;
  "query-strings": any;
  sources: SearchSources;
}

export interface SearchService {
  name: string;
}

export interface SearchResult {
  objects?: SearchObjects;
  errormessages?: SearchErrorMessages;
  service?: SearchService;
  parameters?: SearchParameters;
  "terms-and-conditions": any;
  version: any;
}

export interface WhoisResultAttr {
  value: string;
  link?: string[];
  inverse?: boolean;
}

export interface WhoisResultRow {
  [key: string]: WhoisResultAttr[];
}

export interface WhoisResultTable extends Array<WhoisResultRow> { }

export interface WhoisResults {
  [type: string]: WhoisResultTable;
}

export interface WhoisError extends Array<string> { }

export interface WhoisErrors extends Array<WhoisError> { }

@Injectable({
  providedIn: 'root'
})
export class WhoisService {
  static objectTypes = [
    'inetnum', 'inet6num', 'as-block', 'aut-num', 'as-set', 'route', 'route6',
    'route-set', 'inet-rtr', 'filter-set', 'peering-set', 'rtr-set', 'domain',
    'poetic-form', 'poem', 'mntner', 'irt', 'key-cert', 'organisation', 'role',
    'person'
  ];

  // Valid attributes for inverse search
  static inverseAttributes = [
    'abuse-c', 'abuse-mailbox', 'admin-c', 'fingerpr', 'auth', 'author',
    'form', 'irt-nfy', 'local-as', 'mbrs-by-ref', 'notify', 'mnt-routes',
    'mnt-ref', 'mnt-nfy', 'mnt-lower', 'mnt-irt', 'mnt-domains', 'mnt-by',
    'member-of', 'nserver', 'org', 'origin', 'person', 'ping-hdl', 'ref-nfy',
    'tech-c', 'upd-to', 'zone-c'
  ];

  // + primary keys that have reverse attributes
  static inverseAttributes2 = [
    'abuse-c', 'abuse-mailbox', 'admin-c', 'fingerpr', 'auth', 'author',
    'form', 'irt-nfy', 'local-as', 'mbrs-by-ref', 'notify', 'mnt-routes',
    'mnt-ref', 'mnt-nfy', 'mnt-lower', 'mnt-irt', 'mnt-domains', 'mnt-by',
    'member-of', 'nserver', 'org', 'origin', 'person', 'ping-hdl', 'ref-nfy',
    'tech-c', 'upd-to', 'zone-c',
    'nic-hdl', 'mntner', 'aut-num'
  ];

  static sources = ['RIPE', 'RIPE-GRS', 'AFRINIC-GRS', 'APNIC-GRS', 'LACNIC-GRS', 'ARIN-GRS', 'JPIRR-GRS', 'RADB-GRS', 'RIPE-NONAUTH'];

  static pkey = {
    'inetnum': ['inetnum'],
    'inet6num': ['inet6num'],
    'as-block': ['as-block'],
    'aut-num': ['aut-num'],
    'as-set': ['as-set'],
    'route': ['route', 'origin'],
    'route6': ['route6', 'origin'],
    'route-set': ['route-set'],
    'inet-rtr': ['inet-rtr'],
    'filter-set': ['filter-set'],
    'peering-set': ['peering-set'],
    'rtr-set': ['rtr-set'],
    'domain': ['domain'],
    'poetic-form': ['poetic-form'],
    'poem': ['poem'],
    'mntner': ['mntner'],
    'irt': ['irt'],
    'key-cert': ['key-cert'],
    'organisation': ['organisation'],
    'role': ['nic-hdl'],
    'person': ['nic-hdl'],
  }

  static columns: {[key: string]: string[]} = {
    'inetnum': ['inetnum', 'netname', 'descr', 'country', 'org', 'abuse-c', 'status', 'mnt-by', 'mnt-routes', 'mnt-lower'],
    'inet6num': ['inet6num', 'netname', 'descr', 'country', 'org', 'abuse-c', 'status', 'mnt-by', 'mnt-routes', 'mnt-lower'],
    'as-block': ['as-block', 'descr', 'org', 'mnt-by'],
    'aut-num': ['aut-num', 'as-name', 'descr', 'org', 'abuse-c', 'status', 'mnt-by'],
    'as-set': ['as-set', 'descr', 'members', 'mbrs-by-ref', 'org', 'mnt-by'],
    'route': ['route', 'origin', 'descr', 'org', 'member-of', 'mnt-routes', 'mnt-by'],
    'route6': ['route6', 'origin', 'descr', 'org', 'member-of', 'mnt-routes', 'mnt-by'],
    'route-set': ['route-set', 'descr', 'members', 'mp-members', 'mbrs-by-ref', 'org', 'mnt-by'],
    'inet-rtr': ['inet-rtr', 'descr', 'alias', 'local-as', 'ifaddr', 'interface', 'peer', 'mp-peer', 'member-of', 'org', 'mnt-by'],
    'filter-set': ['filter-set', 'descr', 'filter', 'mp-filter', 'org', 'mnt-by'],
    'peering-set': ['peering-set', 'descr', 'peering', 'mp-peering', 'org', 'mnt-by'],
    'rtr-set': ['rtr-set', 'descr', 'members', 'mp-members', 'mbrs-by-ref', 'org', 'mnt-by'],
    'domain': ['domain', 'descr', 'org', 'zone-c', 'nserver', 'mnt-by'],
    'poetic-form': ['poetic-form', 'descr', 'mnt-by'],
    'poem': ['poem', 'descr', 'form', 'text', 'author', 'mnt-by'],
    'mntner': ['mntner', 'descr', 'org', 'upd-to', 'mnt-nfy', 'auth', 'mnt-by'],
    'irt': ['irt', 'address', 'phone', 'fax-no', 'e-mail', 'signature', 'encryption', 'org', 'auth', 'irt-nfy', 'mnt-by'],
    'key-cert': ['key-cert', 'method', 'owner', 'fingerpr', 'certif', 'org', 'mnt-by'],
    'organisation': ['organisation', 'org-name', 'org-type', 'descr', 'address', 'country', 'phone', 'fax-no', 'e-mail', 'org', 'abuse-c', 'mnt-ref', 'mnt-by'],
    'role': ['nic-hdl', 'role', 'address', 'phone', 'fax-no', 'e-mail', 'org', 'abuse-mailbox', 'mnt-by'],
    'person': ['nic-hdl', 'person', 'address', 'phone', 'fax-no', 'e-mail', 'org', 'mnt-by'],
  };

  constructor(private http: HttpClient) { }

  search(wp: WhoisParams): Observable<SearchObject[]> {
    const params: {[key: string]: string | number | string[]} = {};
    params['query-string'] = wp.query;
    params['flags'] = ['no-referenced'];

    if(!wp.personal)
      params['flags'].push('no-personal');

    // TODO : params['type-filter']
    // TODO : limit / offset
    params['limit'] = wp.limit;
    params['offset'] = wp.offset;

    switch(wp.type) {
      case "text":
        params['source'] = ['RIPE', 'AFRINIC-GRS', 'APNIC-GRS', 'LACNIC-GRS', 'ARIN-GRS', 'JPIRR-GRS'];
        break;
      case "resource":
        params['flags'].push('resource');
        break;
      case "inverse":
        params['source'] = ['RIPE', 'AFRINIC-GRS', 'APNIC-GRS', 'LACNIC-GRS', 'ARIN-GRS', 'JPIRR-GRS'];
        params['inverse-attribute'] = WhoisService.inverseAttributes;
        break;
    }

    return this.http.get<SearchResult>("/api/search", {params: params}).pipe(
      map(res => {
        if(res.errormessages) {
          throw res.errormessages.errormessage;
        }
        if(res.objects) {
          return res.objects.object;
        }
        throw "Oh noes !";
      })
    );
  }

  getObject(source: string, type: string, pkey: string): Observable<SearchObject> {
    return this.http.get<SearchResult>(`/api/${source}/${type}/${pkey}`).pipe(
      map(res => {
        if(res.errormessages) {
          throw res.errormessages.errormessage;
        }
        if(res.objects) {
          return res.objects.object[0];
        }
        throw "Oh noes !";
      })
    );
  }

  // Returns a keyvalue {type: rows[]}
  // rows = [{value, link}]]
  resultToTable(result: SearchObject[]) : WhoisResults {
    const objsByType = groupBy(result, (o: SearchObject) => o.type);
    const res : WhoisResults = {};

    for(const [type, objs] of Object.entries(objsByType)) {
      const rows: WhoisResultTable = [];
      for(const o of objs) {
        const attrs = groupBy(o.attributes.attribute, a => a.name);
        const row: WhoisResultRow = {};
        for(const c of WhoisService.columns[type]) {
          if(attrs[c])
            row[c] = attrs[c].map(a => {
              let attr: WhoisResultAttr = {value: a.value};
              if(a.link)
                attr['link'] = [o.source.id, ''+a["referenced-type"], a.value];
              if(WhoisService.inverseAttributes.includes(c))
                attr['inverse'] = true;
              return attr;
            });
          else
            row[c] = [];
        }
        const key = WhoisService.columns[type][0];
        row[key][0].link = [o.source.id, o.type, o["primary-key"].attribute.map(a => a.value).join('')];
        row[key][0].inverse = true;
        rows.push(row);
      }
      res[type] = rows;
    }

    return res;
  }

  convertErrors(result: SearchErrorMessage[]) : WhoisErrors {
    return result.map(e => e.text.replace(/%s/g, _ => e.args[0].value).trim().split('\n'));
  }
}
