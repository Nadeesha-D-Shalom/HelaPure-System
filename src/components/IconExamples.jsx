import React from 'react';

const IconExamples = () => {
  return (
    <div className="admin-dashboard">
      <div className="container mx-auto px-4 py-8">
        <h1 className="admin-title">Font Awesome Icons & Google Fonts Examples</h1>
        
        {/* Button Examples */}
        <section className="mb-8">
          <h2 className="admin-content-title mb-4">Button Examples with Icons</h2>
          
          <div className="flex flex-wrap gap-4 mb-6">
            {/* Primary Buttons */}
            <button className="admin-btn admin-btn-primary">
              <i className="fas fa-save"></i>
              Save Changes
            </button>
            
            <button className="admin-btn admin-btn-success">
              <i className="fas fa-check"></i>
              Approve
            </button>
            
            <button className="admin-btn admin-btn-danger">
              <i className="fas fa-trash"></i>
              Delete
            </button>
            
            <button className="admin-btn admin-btn-warning">
              <i className="fas fa-exclamation-triangle"></i>
              Warning
            </button>
            
            <button className="admin-btn admin-btn-info">
              <i className="fas fa-info-circle"></i>
              Info
            </button>
            
            <button className="admin-btn admin-btn-outline">
              <i className="fas fa-edit"></i>
              Edit
            </button>
            
            <button className="admin-btn admin-btn-ghost">
              <i className="fas fa-eye"></i>
              View
            </button>
          </div>
          
          {/* Button Sizes */}
          <div className="flex flex-wrap gap-4 mb-6">
            <button className="admin-btn admin-btn-primary admin-btn-sm">
              <i className="fas fa-plus"></i>
              Small
            </button>
            
            <button className="admin-btn admin-btn-primary">
              <i className="fas fa-plus"></i>
              Default
            </button>
            
            <button className="admin-btn admin-btn-primary admin-btn-lg">
              <i className="fas fa-plus"></i>
              Large
            </button>
            
            <button className="admin-btn admin-btn-primary admin-btn-xl">
              <i className="fas fa-plus"></i>
              Extra Large
            </button>
          </div>
          
          {/* Icon Only Buttons */}
          <div className="flex flex-wrap gap-4 mb-6">
            <button className="admin-btn admin-btn-primary admin-btn-icon">
              <i className="fas fa-search"></i>
            </button>
            
            <button className="admin-btn admin-btn-success admin-btn-icon">
              <i className="fas fa-check"></i>
            </button>
            
            <button className="admin-btn admin-btn-danger admin-btn-icon">
              <i className="fas fa-times"></i>
            </button>
            
            <button className="admin-btn admin-btn-outline admin-btn-icon">
              <i className="fas fa-cog"></i>
            </button>
          </div>
          
          {/* Button Groups */}
          <div className="admin-btn-group mb-6">
            <button className="admin-btn admin-btn-primary">
              <i className="fas fa-list"></i>
              List
            </button>
            <button className="admin-btn admin-btn-primary">
              <i className="fas fa-th"></i>
              Grid
            </button>
            <button className="admin-btn admin-btn-primary">
              <i className="fas fa-th-large"></i>
              Cards
            </button>
          </div>
          
          {/* Floating Action Button */}
          <button className="admin-btn admin-btn-primary admin-btn-fab">
            <i className="fas fa-plus"></i>
          </button>
        </section>
        
        {/* Stats Cards Examples */}
        <section className="mb-8">
          <h2 className="admin-content-title mb-4">Stats Cards with Icons</h2>
          
          <div className="admin-stats-grid">
            <div className="admin-stat-card admin-hover-lift">
              <div className="admin-stat-icon pending">
                <i className="fas fa-clock"></i>
              </div>
              <div>
                <p className="admin-stat-number">12</p>
                <p className="admin-stat-label">Pending Requests</p>
              </div>
            </div>
            
            <div className="admin-stat-card admin-hover-lift">
              <div className="admin-stat-icon approved">
                <i className="fas fa-check-circle"></i>
              </div>
              <div>
                <p className="admin-stat-number">45</p>
                <p className="admin-stat-label">Approved</p>
              </div>
            </div>
            
            <div className="admin-stat-card admin-hover-lift">
              <div className="admin-stat-icon sellers">
                <i className="fas fa-users"></i>
              </div>
              <div>
                <p className="admin-stat-number">23</p>
                <p className="admin-stat-label">Active Sellers</p>
              </div>
            </div>
            
            <div className="admin-stat-card admin-hover-lift">
              <div className="admin-stat-icon orders">
                <i className="fas fa-shopping-cart"></i>
              </div>
              <div>
                <p className="admin-stat-number">156</p>
                <p className="admin-stat-label">Total Orders</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Tab Examples */}
        <section className="mb-8">
          <h2 className="admin-content-title mb-4">Tabs with Icons</h2>
          
          <div className="admin-tabs">
            <button className="admin-tab active">
              <span className="admin-tab-icon">
                <i className="fas fa-clipboard-list"></i>
              </span>
              Product Requests
              <span className="admin-tab-badge">5</span>
            </button>
            
            <button className="admin-tab">
              <span className="admin-tab-icon">
                <i className="fas fa-users"></i>
              </span>
              Sellers
              <span className="admin-tab-badge">12</span>
            </button>
            
            <button className="admin-tab">
              <span className="admin-tab-icon">
                <i className="fas fa-shopping-cart"></i>
              </span>
              Orders
            </button>
            
            <button className="admin-tab">
              <span className="admin-tab-icon">
                <i className="fas fa-chart-bar"></i>
              </span>
              Analytics
            </button>
          </div>
        </section>
        
        {/* Table Examples */}
        <section className="mb-8">
          <h2 className="admin-content-title mb-4">Table with Icons</h2>
          
          <div className="admin-table-container">
            <div className="admin-table-header">
              <h3 className="admin-table-title">
                <i className="fas fa-clipboard-list"></i>
                Sample Data Table
              </h3>
              <p className="admin-table-subtitle">Example table with Font Awesome icons</p>
            </div>
            
            <div className="admin-table-actions">
              <div className="admin-table-search">
                <input type="text" placeholder="Search..." />
              </div>
              <div className="admin-table-filters">
                <button className="admin-filter-btn active">All</button>
                <button className="admin-filter-btn">Pending</button>
                <button className="admin-filter-btn">Approved</button>
              </div>
            </div>
            
            <table className="admin-table">
              <thead>
                <tr>
                  <th className="sortable">ID</th>
                  <th className="sortable">Name</th>
                  <th className="sortable">Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Sample Item</td>
                  <td>
                    <span className="admin-status-badge pending">Pending</span>
                  </td>
                  <td>
                    <div className="admin-table-actions-cell">
                      <button className="admin-table-btn primary">
                        <i className="fas fa-eye"></i>
                        View
                      </button>
                      <button className="admin-table-btn success">
                        <i className="fas fa-check"></i>
                        Approve
                      </button>
                      <button className="admin-table-btn danger">
                        <i className="fas fa-times"></i>
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            
            <div className="admin-table-footer">
              <div className="admin-table-info">Showing 1 result</div>
              <div className="admin-table-pagination">
                <button className="admin-pagination-btn" disabled>
                  <i className="fas fa-chevron-left"></i>
                </button>
                <button className="admin-pagination-btn active">1</button>
                <button className="admin-pagination-btn">2</button>
                <button className="admin-pagination-btn">
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Export Buttons */}
        <section className="mb-8">
          <h2 className="admin-content-title mb-4">Export Buttons</h2>
          
          <div className="admin-table-export">
            <button className="admin-export-btn">
              <i className="fas fa-file-csv"></i>
              Export CSV
            </button>
            <button className="admin-export-btn">
              <i className="fas fa-file-pdf"></i>
              Export PDF
            </button>
            <button className="admin-export-btn">
              <i className="fas fa-file-excel"></i>
              Export Excel
            </button>
          </div>
        </section>
        
        {/* Common Icons Reference */}
        <section className="mb-8">
          <h2 className="admin-content-title mb-4">Common Icons Reference</h2>
          
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
            <div className="text-center p-4 border rounded">
              <i className="fas fa-home text-2xl mb-2"></i>
              <p className="text-sm">Home</p>
            </div>
            <div className="text-center p-4 border rounded">
              <i className="fas fa-user text-2xl mb-2"></i>
              <p className="text-sm">User</p>
            </div>
            <div className="text-center p-4 border rounded">
              <i className="fas fa-cog text-2xl mb-2"></i>
              <p className="text-sm">Settings</p>
            </div>
            <div className="text-center p-4 border rounded">
              <i className="fas fa-search text-2xl mb-2"></i>
              <p className="text-sm">Search</p>
            </div>
            <div className="text-center p-4 border rounded">
              <i className="fas fa-plus text-2xl mb-2"></i>
              <p className="text-sm">Add</p>
            </div>
            <div className="text-center p-4 border rounded">
              <i className="fas fa-edit text-2xl mb-2"></i>
              <p className="text-sm">Edit</p>
            </div>
            <div className="text-center p-4 border rounded">
              <i className="fas fa-trash text-2xl mb-2"></i>
              <p className="text-sm">Delete</p>
            </div>
            <div className="text-center p-4 border rounded">
              <i className="fas fa-download text-2xl mb-2"></i>
              <p className="text-sm">Download</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default IconExamples;
