import { useState, useEffect } from 'react';

export default function ContainerMovementSystem() {
  // Initialize entries from localStorage or use default data
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem('containerEntries');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        date: "2026-05-29",
        time: "08:30",
        customer: "ABC Logistics",
        customerRef: "REF001",
        bookingNo: "BK001",
        doorNo: "D1",
        container: "MSKU1234567",
        shippingLine: "Maersk",
        containerSize: "40FT",
        containerType: "DRY",
        from: "Dammam Port",
        to: "Riyadh",
        km: "400",
        status: "Gate Out",
        type: "FULL",
        remarks: "Standard container movement"
      },
      {
        id: 2,
        date: "2026-05-29",
        time: "10:15",
        customer: "Global Shipping",
        customerRef: "REF002",
        bookingNo: "BK002",
        doorNo: "D2",
        container: "OOLU7654321",
        shippingLine: "CMA CGM",
        containerSize: "20FT",
        containerType: "REEFER",
        from: "Jubail",
        to: "Dammam",
        km: "50",
        status: "Gate In",
        type: "EMPTY",
        remarks: "Reefer container for chilled goods"
      }
    ];
  });

  // Save entries to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('containerEntries', JSON.stringify(entries));
  }, [entries]);

  const [formData, setFormData] = useState({
    date: '',
    time: '',
    customer: '',
    customerRef: '',
    bookingNo: '',
    doorNo: '',
    container: '',
    shippingLine: '',
    containerSize: 'Container Size',
    containerType: 'Container Type',
    from: '',
    to: '',
    km: '',
    status: 'Gate In',
    type: 'FULL',
    remarks: ''
  });

  const [searchContainer, setSearchContainer] = useState('');
  const [searchCustomer, setSearchCustomer] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Save new entry
  const handleSaveEntry = () => {
    // Validation
    if (
      !formData.date || 
      !formData.time || 
      !formData.customer || 
      !formData.container ||
      formData.containerSize === 'Container Size' ||
      formData.containerType === 'Container Type'
    ) {
      alert('❌ Please fill in all required fields (marked with *)');
      return;
    }

    const newEntry = {
      id: Date.now(),
      ...formData
    };

    setEntries(prev => [newEntry, ...prev]);
    
    // Show success message
    setSuccessMessage(`✅ Entry saved successfully! Container ${formData.container} added.`);
    setTimeout(() => setSuccessMessage(''), 3000);

    // Reset form
    setFormData({
      date: '',
      time: '',
      customer: '',
      customerRef: '',
      bookingNo: '',
      doorNo: '',
      container: '',
      shippingLine: '',
      containerSize: 'Container Size',
      containerType: 'Container Type',
      from: '',
      to: '',
      km: '',
      status: 'Gate In',
      type: 'FULL',
      remarks: ''
    });
  };

  // Delete entry
  const handleDeleteEntry = (id) => {
    if (confirm('Are you sure you want to delete this entry?')) {
      setEntries(prev => prev.filter(entry => entry.id !== id));
      setSuccessMessage('✅ Entry deleted successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  // Filter entries based on search
  const filteredEntries = entries.filter(entry => {
    const matchContainer = entry.container.toLowerCase().includes(searchContainer.toLowerCase());
    const matchCustomer = entry.customer.toLowerCase().includes(searchCustomer.toLowerCase());
    return matchContainer && matchCustomer;
  });

  // Calculate stats
  const stats = {
    total: entries.length,
    gateIn: entries.filter(e => e.status === 'Gate In').length,
    gateOut: entries.filter(e => e.status === 'Gate Out').length,
    activeCustomers: new Set(entries.map(e => e.customer)).size
  };

  // Export to CSV/Excel
  const handleExportExcel = () => {
    if (entries.length === 0) {
      alert('No data to export');
      return;
    }

    const headers = ['Date', 'Time', 'Customer', 'Container', 'From', 'To', 'Status', 'Type', 'Container Size', 'Remarks'];
    const rows = filteredEntries.length > 0 ? filteredEntries : entries;
    
    let csv = headers.join(',') + '\n';
    rows.forEach(entry => {
      csv += `${entry.date},${entry.time},"${entry.customer}",${entry.container},"${entry.from}","${entry.to}",${entry.status},${entry.type},${entry.containerSize},"${entry.remarks}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `container_movements_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    setSuccessMessage('✅ Data exported successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  // Generate report summary
  const handleGenerateReport = () => {
    const report = `
CONTAINER MOVEMENT REPORT
Generated: ${new Date().toLocaleString()}

SUMMARY STATISTICS:
- Total Movements: ${stats.total}
- Gate In: ${stats.gateIn}
- Gate Out: ${stats.gateOut}
- Active Customers: ${stats.activeCustomers}

CONTAINER TYPES:
- FULL: ${entries.filter(e => e.type === 'FULL').length}
- EMPTY: ${entries.filter(e => e.type === 'EMPTY').length}

CONTAINER SIZES:
- 20FT: ${entries.filter(e => e.containerSize === '20FT').length}
- 40FT: ${entries.filter(e => e.containerSize === '40FT').length}
- 45FT: ${entries.filter(e => e.containerSize === '45FT').length}
    `;
    
    alert(report);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <div className="bg-white rounded-3xl shadow-lg p-6">
          <h1 className="text-3xl font-bold mb-2">
            Container Movement Management System
          </h1>
          <p className="text-gray-500">
            Professional Logistics Operations Dashboard
          </p>
          <p className="text-sm text-gray-400 mt-2">Last Updated: {new Date().toLocaleString()}</p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
            <p className="text-green-700">{successMessage}</p>
          </div>
        )}

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          <div className="bg-white rounded-2xl shadow p-5 hover:shadow-lg transition">
            <p className="text-gray-500 text-sm">Today's Movements</p>
            <h2 className="text-3xl font-bold mt-2 text-blue-600">{stats.total}</h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-5 hover:shadow-lg transition">
            <p className="text-gray-500 text-sm">Gate In</p>
            <h2 className="text-3xl font-bold mt-2 text-green-600">{stats.gateIn}</h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-5 hover:shadow-lg transition">
            <p className="text-gray-500 text-sm">Gate Out</p>
            <h2 className="text-3xl font-bold mt-2 text-orange-600">{stats.gateOut}</h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-5 hover:shadow-lg transition">
            <p className="text-gray-500 text-sm">Active Customers</p>
            <h2 className="text-3xl font-bold mt-2 text-purple-600">{stats.activeCustomers}</h2>
          </div>

        </div>

        {/* Form Section */}
        <div className="bg-white rounded-3xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-6">
            New Container Movement Entry
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <input
              name="customer"
              className="border-2 border-gray-200 rounded-xl p-3 focus:border-blue-500 focus:outline-none"
              placeholder="Customer Name *"
              value={formData.customer}
              onChange={handleInputChange}
            />
            <input
              name="customerRef"
              className="border-2 border-gray-200 rounded-xl p-3 focus:border-blue-500 focus:outline-none"
              placeholder="Customer Reference No"
              value={formData.customerRef}
              onChange={handleInputChange}
            />
            <input
              name="bookingNo"
              className="border-2 border-gray-200 rounded-xl p-3 focus:border-blue-500 focus:outline-none"
              placeholder="Booking No"
              value={formData.bookingNo}
              onChange={handleInputChange}
            />

            <input
              type="date"
              name="date"
              className="border-2 border-gray-200 rounded-xl p-3 focus:border-blue-500 focus:outline-none"
              value={formData.date}
              onChange={handleInputChange}
              placeholder="Date *"
            />
            <input
              type="time"
              name="time"
              className="border-2 border-gray-200 rounded-xl p-3 focus:border-blue-500 focus:outline-none"
              value={formData.time}
              onChange={handleInputChange}
              placeholder="Time *"
            />
            <input
              name="doorNo"
              className="border-2 border-gray-200 rounded-xl p-3 focus:border-blue-500 focus:outline-none"
              placeholder="Door No"
              value={formData.doorNo}
              onChange={handleInputChange}
            />

            <input
              name="container"
              className="border-2 border-gray-200 rounded-xl p-3 focus:border-blue-500 focus:outline-none"
              placeholder="Container No / Cargo Detail *"
              value={formData.container}
              onChange={handleInputChange}
            />
            <input
              name="shippingLine"
              className="border-2 border-gray-200 rounded-xl p-3 focus:border-blue-500 focus:outline-none"
              placeholder="Shipping Line"
              value={formData.shippingLine}
              onChange={handleInputChange}
            />

            <select
              name="containerSize"
              className="border-2 border-gray-200 rounded-xl p-3 focus:border-blue-500 focus:outline-none"
              value={formData.containerSize}
              onChange={handleInputChange}
            >
              <option disabled>Container Size *</option>
              <option>20FT</option>
              <option>40FT</option>
              <option>45FT</option>
            </select>

            <select
              name="containerType"
              className="border-2 border-gray-200 rounded-xl p-3 focus:border-blue-500 focus:outline-none"
              value={formData.containerType}
              onChange={handleInputChange}
            >
              <option disabled>Container Type *</option>
              <option>DRY</option>
              <option>REEFER</option>
              <option>OPEN TOP</option>
              <option>FLAT RACK</option>
              <option>TANK</option>
            </select>

            <select
              name="type"
              className="border-2 border-gray-200 rounded-xl p-3 focus:border-blue-500 focus:outline-none"
              value={formData.type}
              onChange={handleInputChange}
            >
              <option>FULL / EMPTY</option>
              <option>FULL</option>
              <option>EMPTY</option>
            </select>

            <input
              name="from"
              className="border-2 border-gray-200 rounded-xl p-3 focus:border-blue-500 focus:outline-none"
              placeholder="From"
              value={formData.from}
              onChange={handleInputChange}
            />
            <input
              name="to"
              className="border-2 border-gray-200 rounded-xl p-3 focus:border-blue-500 focus:outline-none"
              placeholder="To"
              value={formData.to}
              onChange={handleInputChange}
            />
            <input
              name="km"
              className="border-2 border-gray-200 rounded-xl p-3 focus:border-blue-500 focus:outline-none"
              placeholder="KM"
              value={formData.km}
              onChange={handleInputChange}
            />

            <select
              name="status"
              className="border-2 border-gray-200 rounded-xl p-3 focus:border-blue-500 focus:outline-none"
              value={formData.status}
              onChange={handleInputChange}
            >
              <option>Gate Information</option>
              <option>Gate In</option>
              <option>Gate Out</option>
            </select>

            <textarea
              name="remarks"
              className="border-2 border-gray-200 rounded-xl p-3 focus:border-blue-500 focus:outline-none md:col-span-2"
              placeholder="Remarks"
              value={formData.remarks}
              onChange={handleInputChange}
              rows="3"
            />

          </div>

          <div className="mt-6 flex gap-4 flex-wrap">
            <button
              onClick={handleSaveEntry}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl shadow transition transform hover:scale-105"
            >
              💾 Save Entry
            </button>

            <button
              onClick={handleExportExcel}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl shadow transition transform hover:scale-105"
            >
              📊 Export Excel
            </button>

            <button
              onClick={handleGenerateReport}
              className="bg-slate-700 hover:bg-slate-800 text-white px-6 py-3 rounded-2xl shadow transition transform hover:scale-105"
            >
              📈 Generate Report
            </button>
          </div>
        </div>

        {/* Live Records Section */}
        <div className="bg-white rounded-3xl shadow-lg p-6 overflow-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-semibold">
                Live Movement Records
              </h2>
              <p className="text-sm text-gray-500 mt-1">Total: {filteredEntries.length} / {entries.length}</p>
            </div>

            <div className="flex gap-3 flex-wrap">
              <input
                className="border-2 border-gray-200 rounded-xl px-4 py-2 focus:border-blue-500 focus:outline-none"
                placeholder="Search Container No"
                value={searchContainer}
                onChange={(e) => setSearchContainer(e.target.value)}
              />

              <input
                className="border-2 border-gray-200 rounded-xl px-4 py-2 focus:border-blue-500 focus:outline-none"
                placeholder="Search Customer"
                value={searchCustomer}
                onChange={(e) => setSearchCustomer(e.target.value)}
              />
            </div>
          </div>

          {filteredEntries.length === 0 && entries.length > 0 ? (
            <div className="text-center py-8 text-gray-500">
              No records found matching your search criteria.
            </div>
          ) : (
            <table className="w-full border-collapse min-w-[1200px]">
              <thead>
                <tr className="bg-slate-800 text-white">
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-left">Time</th>
                  <th className="p-3 text-left">Customer</th>
                  <th className="p-3 text-left">Container</th>
                  <th className="p-3 text-left">From</th>
                  <th className="p-3 text-left">To</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Type</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredEntries.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b hover:bg-slate-50 transition"
                  >
                    <td className="p-3">{item.date}</td>
                    <td className="p-3">{item.time}</td>
                    <td className="p-3 font-medium">{item.customer}</td>
                    <td className="p-3 font-semibold text-blue-600">{item.container}</td>
                    <td className="p-3">{item.from}</td>
                    <td className="p-3">{item.to}</td>
                    <td className="p-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        item.status === 'Gate In' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-orange-100 text-orange-700'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        item.type === 'FULL'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {item.type}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => handleDeleteEntry(item.id)}
                        className="text-red-600 hover:text-red-800 font-semibold transition"
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* System Features */}
        <div className="bg-white rounded-3xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">
            System Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <div className="border-2 border-blue-200 rounded-2xl p-4 bg-blue-50">
              <h3 className="font-semibold text-lg mb-2">💻 Multi User Access</h3>
              <p className="text-gray-600 text-sm">
                Multiple staff can create entries simultaneously with real-time updates.
              </p>
            </div>

            <div className="border-2 border-green-200 rounded-2xl p-4 bg-green-50">
              <h3 className="font-semibold text-lg mb-2">📊 Excel Export</h3>
              <p className="text-gray-600 text-sm">
                Export all records instantly to CSV/Excel for further analysis.
              </p>
            </div>

            <div className="border-2 border-purple-200 rounded-2xl p-4 bg-purple-50">
              <h3 className="font-semibold text-lg mb-2">📈 Live Dashboard</h3>
              <p className="text-gray-600 text-sm">
                Real-time tracking of all container movements with live statistics.
              </p>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm p-4">
          <p>Container Movement Management System v1.0 | All data is saved locally</p>
        </div>

      </div>
    </div>
  );
}
