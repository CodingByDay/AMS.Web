import { UpdateFieldsManipulatorParams } from '../../../core/model/manipulators/fields-manipulator';
import { CommandBase } from '../command-base';
export class UpdateFieldCommandBase extends CommandBase {
    canModify() {
        return true;
    }
    static updateFields(command, updateThisSubDocs, callback, options) {
        command.history.beginTransaction();
        command.control.beginLoading();
        command.control.beginUpdate();
        return command.modelManipulator.field.updateFields(command.control.layoutFormatterManager, command.control.createFieldRequestManager(), new UpdateFieldsManipulatorParams(updateThisSubDocs, (result) => {
            command.control.endUpdate();
            command.control.endLoading();
            command.history.endTransaction();
            if (callback)
                callback(result);
        }, options));
    }
}
