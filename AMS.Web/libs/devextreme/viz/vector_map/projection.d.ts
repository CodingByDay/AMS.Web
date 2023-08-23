/**
* DevExtreme (viz/vector_map/projection.d.ts)
* Version: 23.1.4
* Build date: Fri Jul 14 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
export type VectorMapProjection = 'equirectangular' | 'lambert' | 'mercator' | 'miller';

/**
 * 
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.devexpress.com/ticket/create Support Center}. We will check if there is an alternative solution.
 */
export interface VectorMapProjectionConfig {
    /**
     * Specifies the projection&apos;s ratio of the width to the height.
     */
    aspectRatio?: number;
    /**
     * Converts coordinates from [x, y] to [lon, lat].
     */
    from?: ((coordinates: Array<number>) => Array<number>);
    /**
     * Converts coordinates from [lon, lat] to [x, y].
     */
    to?: ((coordinates: Array<number>) => Array<number>);
}

/**
                                                                  * Creates a new projection.
                                                                  * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.devexpress.com/ticket/create Support Center}. We will check if there is an alternative solution.
                                                                  */
                                                                 export const projection: {
    /**
     * 
     */
    add(name: string, projectionConfig: VectorMapProjectionConfig | any): void;

    /**
     * Gets a predefined or custom projection from the projection storage.
     */
    get(name: VectorMapProjection | string): any;

    (data: VectorMapProjectionConfig): any;
};
