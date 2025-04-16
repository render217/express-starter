/*======================================
    [Table-X] Mapper  | Guideline
=======================================*/

/**
 * 🔧 Guideline to create a table mapper in the project
 *
 * 1. Define the table type in `@libs/scylladb/types.ts`.
 *
 * @example
 * export type TableX = {
 *   id: string;
 *   teamId: string;
 * };
 *
 * 2. Add the table name to `@libs/scylladb/constant.ts`.
 *
 * @example
 * export const TABLES = {
 *   ...other_tables,
 *   TABLE_X: 'table_x',
 * };
 *
 * 3. Define the table mapper in `@libs/scylladb/mapper.ts`.
 *
 * @example
 * import * as I from '@libs/scylladb/types';
 * import { TABLES as T } from '@libs/scylladb/constant';
 *
 * const mapper = new Mapper(cluster, {
 *   models: {
 *     ...other_models,
 *     TableX: {
 *       tables: [T.TABLE_X],
 *       mappings: new UnderscoreCqlToCamelCaseMappings(),
 *     },
 *   },
 * });
 *
 * 4. Define the table mapper interface.
 *
 * @example
 * interface TableXMapper extends cassandra.mapping.ModelMapper<I.TableX & {
 *   customMethod: (params: { teamId: string }) => Promise<cassandra.mapping.Result<I.TableX>>;
 * }> {
 *   customMethod: (params: { teamId: string }) => Promise<cassandra.mapping.Result<I.TableX>>;
 * }
 *
 * 5. Create the mapper instance.
 *
 * @example
 * export const TableX = mapper.forModel('TableX') as TableXMapper;
 *
 * 6. Add custom methods to the mapper instance using `mapWithQuery`.
 *
 * @example
 * TableX.customMethod = TableX.mapWithQuery(
 *   `SELECT * FROM table_x WHERE team_id = ?`, // CQL query
 *   (param) => [param.teamId], // binding parameters
 * );
 *
 * // Usage
 * const result = await TableX.customMethod({ teamId: 'team123' });
 * console.log(result.toArray());
 *
 * 7. Template snippet to reuse
 *
 * @example
 * 
   /*======================================
      [Table-X] Mapper
    ======================================*\/
 
  /**
   * Interface for TableX model with custom methods.
   * 
   *\/

  interface TableXMapper extends cassandra.mapping.ModelMapper<I.TableX & {
    customMethod: (params: { teamId: string }) => Promise<cassandra.mapping.Result<I.TableX>>;
  }> {
    /**
     * Returns a ...
     *
     * @param params - An Object containing:
     *   - `teamId` (string): teamId uuid.
     * @returns {Promise<cassandra.mapping.Result<I.ITableX>>}
     *\/
     customMethod: (params: { teamId: string }) => Promise<cassandra.mapping.Result<I.TableX>>;
  }
 
  /**
   * Mapper instance for the MessageSentByType model.
   * 
   *\/

  export const TableX = mapper.forModel('TableX') as TableXMapper;
 
  TableX.customMethod = TableX.mapWithQuery(
    `SELECT * FROM table_x WHERE team_id = ?`,
    (param) => [param.teamId],
  );

 */

import cassandra from 'cassandra-driver';
import { cluster } from '@libs/scylladb/db';

// Import table types as I
import * as I from '@libs/scylladb/types';

// Import table name constants as T
import { TABLES as T } from '@libs/scylladb/constant';

const Mapper = cassandra.mapping.Mapper;
const UnderscoreCqlToCamelCaseMappings =
  cassandra.mapping.UnderscoreCqlToCamelCaseMappings;

/**
 * Mapper instance to interact with ScyllaDB models.
 */
const mapper = new Mapper(cluster, {
  models: {
    MessageSentByType: {
      tables: [T.MESSAGE_SENT_BY_TYPE],
      mappings: new UnderscoreCqlToCamelCaseMappings(),
    },
    MessageSentByCampaign: {
      tables: [T.MESSAGE_SENT_BY_CAMPAIGN],
      mappings: new UnderscoreCqlToCamelCaseMappings(),
    },
  },
});

/*======================================
    Message Sent By Type Mapper
 ======================================*/

/**
 * Interface for MessageSentByType model with  custom methods.
 *
 */

interface MessageSentByTypeMapper
  extends cassandra.mapping.ModelMapper<
    I.IMessageSentByType & {
      getCount: (params: { sender: string; bucket_ids: string[] }) => number;
      getCharged: (params: {
        ischarged: boolean;
      }) => Promise<cassandra.mapping.Result<I.IMessageSentByType>>;
    }
  > {
  /**
   * Returns a Promise resolving to the count of matching rows.
   *
   * @param params - An Object containing:
   *   - `sender` (string): The sender identifier to filter messages.
   *   - `bucket_ids` (string[]): An array of bucket IDs to filter messages.
   *
   * @returns {Promise<cassandra.mapping.Result>} A Promise resolving to the count of matching rows.
   */
  getCount: (params: {
    sender: string;
    bucket_ids: string[];
  }) => Promise<cassandra.mapping.Result>;
  /**
   * Returns all messages filtered by ischarged flag
   *
   * @param params - An Object containing:
   *   - `ischarged` (boolean): boolean value
   * @returns {Promise<cassandra.mapping.Result<I.IMessageSentByType>>}.
   */
  getCharged: (params: {
    ischarged: boolean;
  }) => Promise<cassandra.mapping.Result<I.IMessageSentByType>>;
}
// cassandra.types.ResultSet/

/**
 * Mapper instance for the MessageSentByType model.
 */
export const MessageSentByType = mapper.forModel(
  'MessageSentByType',
) as MessageSentByTypeMapper;

MessageSentByType.getCount = MessageSentByType.mapWithQuery(
  `SELECT count(*) FROM ${T.MESSAGE_SENT_BY_TYPE} WHERE sender = ? AND bucket_id IN ?`,
  (result) => [result.sender, result.bucketId],
);

MessageSentByType.getCharged = MessageSentByType.mapWithQuery(
  `SELECT * FROM ${T.MESSAGE_SENT_BY_TYPE} WHERE ischarged = ? ALLOW FILTERING`,
  (params) => [params.ischarged],
);

/*======================================
    Message Sent By Campaign Mapper
 ======================================*/

/**
 * Interface for MessageSentByCampaign model with custom methods.
 *
 */
interface MessageSentByCampaignMapper
  extends cassandra.mapping.ModelMapper<
    I.IMessageSentByCampaign & {
      customMethod: () => number;
    }
  > {
  customMethod: () => number;
}

/**
 * Mapper instance for the MessageSentByCampaign model.
 *
 */
export const MessageSentByCampaign = mapper.forModel(
  'MessageSentByCampaign',
) as MessageSentByCampaignMapper;
