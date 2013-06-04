/**
 *
 */
function drupalgap_mvc_init() {
  try {
    if (drupalgap.settings.debug) {
      console.log('drupalgap_mvc_init()');
    }
    // Load models...
    // For each module that implements hook_mvc_model(), iterate over each model
    // placing it into drupalgap.mvc.models, each model will be placed into
    // a namespace according to its implementing module to avoid namespace
    // collisions.
    var modules = module_implements('mvc_model');
    for (var i = 0; i < modules.length; i++) {
      var module = modules[i];
      var models = module_invoke(module, 'mvc_model');
      if (models) {
        // Create namespace for model, keyed by module name.
        if (!eval('drupalgap.mvc.models.' + module)) {
          eval('drupalgap.mvc.models.' + module + ' = {};');
        }
        // Add each model to its namespace within drupalgap.mvc.models
        $.each(models, function(model_name, model){
            eval('drupalgap.mvc.models.' + module + '.' + model_name + ' = model;');
        });
      }
    }
    // These may not be needed. Perhaps we should just call assumed hooks that
    // should be implemented for any custom views and controllers at the time
    // they are needed, probably no need to bundle them inside drupalgap.mvc.
    //var views = module_invoke_all('mvc_view');
    //var controllers = module_invoke_all('mvc_controller');
  }
  catch (error) {
    alert('drupalgap_mvc_init - ' + error);
  }
}

// We'll need developer friendly front end functions, e.g.
// model_load();
// model_save();
// model_delete();
// model_item_load();
// model_item_save();
// model_item_delete();
// etc...

/**
 *
 */
function drupalgap_mvc_model_load(module, name) {
  try {
    if (drupalgap.settings.debug) {
      console.log('drupalgap_mvc_model_load(' + module + ', ' + name + ')');
    }
    if (drupalgap.mvc.models[module] === 'undefined' || drupalgap.mvc.models[module][name] === 'undefined') {
      return false;
    }
    return drupalgap.mvc.models[module][name];
  }
  catch (error) {
    alert('drupalgap_mvc_model_load - ' + error);
  }
}

/**
 * Given a module name, and model name, this generates and returns the form JSON
 * object to create a model item.
 */
function drupalgap_mvc_model_create_form(module, name) {
   try {
    if (drupalgap.settings.debug) {
      console.log('drupalgap_mvc_model_create_form(' + module + ', ' + name + ')');
    }
    var form = false;
    var model = drupalgap_mvc_model_load(module, name);
    if (model) {
      form = {
        id:"drupalgap_mvc_model_create_form",
        elements:model
      };
      form.buttons = {
        cancel:{"title":"Cancel"}
      };
      form.elements.submit = {
        type:"submit",
        value:"Create"
      };
    }
    return form;
  }
  catch (error) {
    alert('drupalgap_mvc_model_create_form - ' + error);
  }
}

function drupalgap_mvc_model_create_form_submit(form, form_state) {
  alert('shweeeet');
}

