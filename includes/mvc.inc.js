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
    // a namespace according to the module that implements it, to avoid namespace
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
        // For each model type...
        $.each(models, function(model_type, model){
            // Set the primary key 'id', the module name, and model type
            // on the model fields.
            model.fields.id = {
              "type":"hidden",
              "title":"ID",
              "required":false
            };
            model.fields.module = {
              "type":"hidden",
              "title":"Module",
              "required":true,
              "default_value":module,
            };
            model.fields.type = {
              "type":"hidden",
              "title":"Model Type",
              "required":true,
              "default_value":model_type,
            };
            // Add each model type to its namespace within drupalgap.mvc.models
            eval('drupalgap.mvc.models.' + module + '.' + model_type + ' = model;');
            // Save an empty item collection to local storage.
            window.localStorage.setItem('items_' + module + '_' + model_type, '[]');
        });
      }
    }
    //console.log(JSON.stringify(drupalgap.mvc.models));
    //alert('drupalgap_mvc_init');
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
// item_load();
// item_save();
// item_delete();
// etc...

/**
 * Given a module name and a corresponding model name, this will load the model
 * from drupalgap.mvc.models.
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
        elements:model.fields
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

/**
 *
 */
/*function drupalgap_mvc_model_create_form_validate(form, form_state) {
  
}*/

/**
 *
 */
function drupalgap_mvc_model_create_form_submit(form, form_state) {
  try {
    console.log(JSON.stringify(form));
    console.log(JSON.stringify(form_state));
    item_save(form_state.values);
    alert('submitting...');
  }
  catch (error) {
    alert('drupalgap_mvc_model_create_form_submit - ' + error);
  }
}

/**
 *
 */
function item_save(item) {
  try {
    if (typeof item === 'undefined') { return false; }
    // If there is no id, then this is a new item, generate an item id.
    if (!item.id) {
      // We'll set the new item id to the UTC in seconds.
      var d = new Date();
      item.id = d.getTime()/1000;
    }
    // Save the item to its local storage collection.
    //window.localStorage.setItem('items_' + item.module + '_' + item.type item.id, JSON.stringify(item));
    // Save the item id in the model's item collection.
    return true;  
  }
  catch (error) {
    alert('item_save - ' + error);
  }
}

