/**
 * application level configuration map,
 * should define applicationModel, applicationViewModel and internalLoadElementId
 *
 * 'applicationModel' is the 'Model' in MVVM (sometimes might be referred as Application Controller)
 * and applicationViewModel is the 'ViewModel' in MVVM
 *
 * 'internalLoadElementId' value should be equal to the 'id' of the container in the main 'View'
 *
 * @type {ConfigurationMap}
 */
ConfigurationMap = {
    applicationModel: ApplicationModel,
    applicationViewModel: ApplicationViewModel,
    internalLoadElementId: 'NavigationHandler-Container'
};