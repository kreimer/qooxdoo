/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2009 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's left-level directory for details.

   Authors:
     * Fabian Jakobs (fjakobs)
     * Jonathan Weiß (jonathan_rass)

************************************************************************ */

/**
 * The Scroller wraps a {@link Pane} and provides scroll bars to interactively
 * scroll the pane's content.
 */
qx.Class.define("qx.ui.virtual.core.Scroller",
{
  extend : qx.ui.core.AbstractScrollArea,


  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * @param rowCount {Integer?0} The number of rows of the virtual grid
   * @param columnCount {Integer?0} The number of columns of the virtual grid
   * @param cellHeight {Integer?10} The default cell height
   * @param cellWidth {Integer?10} The default cell width 
   */  
  construct : function(rowCount, columnCount, cellHeight, cellWidth)
  {
    this.base(arguments);

    this.__pane = new qx.ui.virtual.core.Pane(rowCount, columnCount, cellHeight, cellWidth);
    this.__pane.addListener("update", this._computeScrollbars, this);  
    this.__pane.addListener("scrollX", this._onScrollPaneX, this);
    this.__pane.addListener("scrollY", this._onScrollPaneY, this);

    this.__pane.addListener("click", this._onCellClick, this);  
    this.__pane.addListener("dblclick", this._onDblclickPane, this);
    this.__pane.addListener("contextmenu", this._onContextMenu, this);


    this._add(this.__pane, {row: 0, column: 0});    
  },

  /*
  *****************************************************************************
     EVENTS
  *****************************************************************************
  */

  events :
  {
    /**See {@link qx.ui.table.Table#cellClick}.*/
    "cellClick" : "qx.ui.table.pane.CellEvent",

    /**
     * Dispatched when the context menu is needed in a data cell
     */
    "cellContextmenu" : "qx.ui.table.pane.CellEvent"
  },


  /*
   *****************************************************************************
      PROPERTIES
   *****************************************************************************
   */

   properties :
   {
     // overridden
     width :
     {
       refine : true,
       init : null
     },


     // overridden
     height :
     {
       refine : true,
       init : null
     }  
   },
   
   
  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /*
    ---------------------------------------------------------------------------
      ACCESSOR METHODS
    ---------------------------------------------------------------------------
    */
     
    /**
     * Get the scroller's virtual pane
     * 
     * @return {Pane} The scroller's pane 
     */
    getPane : function() {
      return this.__pane;
    },
     
    
    /*
    ---------------------------------------------------------------------------
      CHILD CONTROL SUPPORT
    ---------------------------------------------------------------------------
    */

    // overridden
    _createChildControlImpl : function(id)
    {
      if (id == "pane") {
        return this.__pane;
      } else {
        return this.base(arguments, id); 
      }
    },


    /*
    ---------------------------------------------------------------------------
      ITEM LOCATION SUPPORT
    ---------------------------------------------------------------------------
    */

    /**
     * NOT IMPLEMENTED
     *
     * @param item {qx.ui.core.Widget} Item to query
     * @return {Integer} Top offset
     */
    getItemTop : function(item) {
      throw new Error("The method 'getItemTop' is not implemented!");
    },


    /**
     * NOT IMPLEMENTED
     *
     * @param item {qx.ui.core.Widget} Item to query
     * @return {Integer} Top offset
     */
    getItemBottom : function(item) {
      throw new Error("The method 'getItemBottom' is not implemented!");
    },


    /**
     * NOT IMPLEMENTED
     *
     * @param item {qx.ui.core.Widget} Item to query
     * @return {Integer} Top offset
     */
    getItemLeft : function(item) {
      throw new Error("The method 'getItemLeft' is not implemented!");
    },


    /**
     * NOT IMPLEMENTED
     *
     * @param item {qx.ui.core.Widget} Item to query
     * @return {Integer} Right offset
     */
    getItemRight : function(item) {
      throw new Error("The method 'getItemRight' is not implemented!");
    },

    /*
    ---------------------------------------------------------------------------
      EVENT LISTENERS
    ---------------------------------------------------------------------------
    */

    // overridden
    _onScrollBarX : function(e) {
      this.__pane.setScrollX(e.getData());
    },


    // overridden
    _onScrollBarY : function(e) {
      this.__pane.setScrollY(e.getData());
    },


    _onCellClick : function(e)
    {
      var coords = this.__getCoords(e);
      this.fireEvent("cellClick", qx.ui.table.pane.CellEvent, [this, e, coords.row, coords.column], true);
    },

    _onContextMenu : function(e)
    {
      var coords = this.__getCoords(e);
      this.fireEvent("cellContextmenu", qx.ui.table.pane.CellEvent, [this, e, coords.row, coords.column], true);
    },


    _onDblclickPane : function(e)
    {
      var coords = this.__getCoords(e);
      this.fireEvent("cellDblclick", qx.ui.table.pane.CellEvent, [this, e, coords.row, coords.column], true);
    },


    __getCoords : function(e) {
      return this.getPane().getCellAtPosition(e.getDocumentLeft(), e.getDocumentTop());
    }


  }
});
