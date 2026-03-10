import React from 'react';

const FullPageExample = () => {
  return (
    <div className="admin-dashboard">
      {/* Full Width Header */}
      <div className="admin-header">
        <div className="admin-header-content">
          <div>
            <h1 className="admin-title">Full Page Admin Dashboard</h1>
            <p className="admin-subtitle">Utilizing the complete viewport width for maximum efficiency</p>
          </div>
          <div className="admin-commission">
            <p className="text-sm opacity-90 mb-1">Total Revenue</p>
            <p className="text-3xl font-bold">$125,430.50</p>
          </div>
        </div>
      </div>

      {/* Full Width Main Content */}
      <div className="admin-main-content">
        {/* Stats Grid - Full Width */}
        <div className="admin-stats-grid">
          <div className="admin-stat-card admin-hover-lift">
            <div className="admin-stat-icon pending">
              <i className="fas fa-clock"></i>
            </div>
            <div>
              <p className="admin-stat-number">1,247</p>
              <p className="admin-stat-label">Pending Orders</p>
            </div>
          </div>
          
          <div className="admin-stat-card admin-hover-lift">
            <div className="admin-stat-icon approved">
              <i className="fas fa-check-circle"></i>
            </div>
            <div>
              <p className="admin-stat-number">8,934</p>
              <p className="admin-stat-label">Completed Orders</p>
            </div>
          </div>
          
          <div className="admin-stat-card admin-hover-lift">
            <div className="admin-stat-icon sellers">
              <i className="fas fa-users"></i>
            </div>
            <div>
              <p className="admin-stat-number">342</p>
              <p className="admin-stat-label">Active Users</p>
            </div>
          </div>
          
          <div className="admin-stat-card admin-hover-lift">
            <div className="admin-stat-icon orders">
              <i className="fas fa-chart-line"></i>
            </div>
            <div>
              <p className="admin-stat-number">+24.5%</p>
              <p className="admin-stat-label">Growth Rate</p>
            </div>
          </div>
        </div>

        {/* Full Width Tabs */}
        <div className="admin-tabs">
          <button className="admin-tab active">
            <span className="admin-tab-icon">
              <i className="fas fa-dashboard"></i>
            </span>
            Dashboard
            <span className="admin-tab-badge">Live</span>
          </button>
          
          <button className="admin-tab">
            <span className="admin-tab-icon">
              <i className="fas fa-shopping-cart"></i>
            </span>
            Orders
            <span className="admin-tab-badge">1,247</span>
          </button>
          
          <button className="admin-tab">
            <span className="admin-tab-icon">
              <i className="fas fa-users"></i>
            </span>
            Users
            <span className="admin-tab-badge">342</span>
          </button>
          
          <button className="admin-tab">
            <span className="admin-tab-icon">
              <i className="fas fa-chart-bar"></i>
            </span>
            Analytics
          </button>
          
          <button className="admin-tab">
            <span className="admin-tab-icon">
              <i className="fas fa-cog"></i>
            </span>
            Settings
          </button>
        </div>

        {/* Full Width Content */}
        <div className="admin-content admin-hover-lift">
          <div className="admin-content-header">
            <h2 className="admin-content-title">
              <i className="fas fa-chart-line"></i>
              Real-time Analytics Dashboard
            </h2>
            <p className="admin-content-subtitle">
              Comprehensive overview of platform performance and user activity
            </p>
          </div>
          
          {/* Analytics Grid - Full Width */}
          <div className="admin-analytics-grid">
            <div className="admin-analytics-card revenue admin-hover-lift">
              <h3 className="admin-analytics-title">Total Revenue</h3>
              <p className="admin-analytics-value">$125,430.50</p>
              <p className="admin-analytics-label">This Month</p>
            </div>
            
            <div className="admin-analytics-card growth admin-hover-lift">
              <h3 className="admin-analytics-title">User Growth</h3>
              <p className="admin-analytics-value">+24.5%</p>
              <p className="admin-analytics-label">vs Last Month</p>
            </div>
            
            <div className="admin-analytics-card orders admin-hover-lift">
              <h3 className="admin-analytics-title">Order Volume</h3>
              <p className="admin-analytics-value">1,247</p>
              <p className="admin-analytics-label">Pending Orders</p>
            </div>
          </div>
        </div>

        {/* Full Width Table Example */}
        <div className="admin-table-container">
          <div className="admin-table-header">
            <h3 className="admin-table-title">
              <i className="fas fa-list-alt"></i>
              Recent Activity
            </h3>
            <p className="admin-table-subtitle">Latest platform activities and user interactions</p>
          </div>
          
          <div className="admin-table-actions">
            <div className="admin-table-search">
              <input type="text" placeholder="Search activities..." />
            </div>
            <div className="admin-table-filters">
              <button className="admin-filter-btn active">All</button>
              <button className="admin-filter-btn">Orders</button>
              <button className="admin-filter-btn">Users</button>
              <button className="admin-filter-btn">System</button>
            </div>
          </div>

          <table className="admin-table">
            <thead>
              <tr>
                <th className="sortable">Time</th>
                <th className="sortable">User</th>
                <th className="sortable">Action</th>
                <th className="sortable">Status</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2 minutes ago</td>
                <td>john.doe@example.com</td>
                <td>Order Placed</td>
                <td>
                  <span className="admin-status-badge pending">Pending</span>
                </td>
                <td>
                  <div className="admin-table-actions-cell">
                    <button className="admin-table-btn primary">
                      <i className="fas fa-eye"></i>
                      View
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>5 minutes ago</td>
                <td>jane.smith@example.com</td>
                <td>Payment Completed</td>
                <td>
                  <span className="admin-status-badge approved">Completed</span>
                </td>
                <td>
                  <div className="admin-table-actions-cell">
                    <button className="admin-table-btn success">
                      <i className="fas fa-check"></i>
                      Process
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          
          <div className="admin-table-footer">
            <div className="admin-table-info">Showing 2 of 1,247 results</div>
            <div className="admin-table-pagination">
              <button className="admin-pagination-btn" disabled>
                <i className="fas fa-chevron-left"></i>
              </button>
              <button className="admin-pagination-btn active">1</button>
              <button className="admin-pagination-btn">2</button>
              <button className="admin-pagination-btn">3</button>
              <button className="admin-pagination-btn">
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullPageExample;
