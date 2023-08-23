/**
* DevExpress Analytics (core\elements\serializableModel.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Disposable } from '../../serializer/utils';
import { ModelSerializer } from '../../serializer/serializer';
export class SerializableModel extends Disposable {
    preInitProperties(model, serializer, info) { }
    constructor(model, serializer, info) {
        super();
        this.preInitProperties(model, serializer, info);
        if (info) {
            this.getInfo = () => {
                return info;
            };
        }
        serializer = serializer || new ModelSerializer();
        serializer.deserialize(this, model, info);
    }
    getInfo() {
        return null;
    }
}
