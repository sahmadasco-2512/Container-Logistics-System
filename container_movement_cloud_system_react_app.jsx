export default function ContainerMovementSystem() {
  const entries = [
    {
      date: "2026-05-29",
      time: "08:30",
      customer: "ABC Logistics",
      container: "MSKU1234567",
      from: "Dammam Port",
      to: "Riyadh",
      status: "Gate Out",
      type: "FULL"
    },
    {
      date: "2026-05-29",
      time: "10:15",
      customer: "Global Shipping",
      container: "OOLU7654321",
      from: "Jubail",
      to: "Dammam",
      status: "Gate In",
      type: "EMPTY"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">

        <div className="bg-white rounded-3xl shadow-lg p-6">
          <h1 className="text-3xl font-bold mb-2">
            Container Movement Management System
          </h1>
          <p className="text-gray-500">
            Professional Logistics Operations Dashboard
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          <div className="bg-white rounded-2xl shadow p-5">
            <p className="text-gray-500 text-sm">Today's Movements</p>
            <h2 className="text-3xl font-bold mt-2">124</h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-5">
            <p className="text-gray-500 text-sm">Gate In</p>
            <h2 className="text-3xl font-bold mt-2">58</h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-5">
            <p className="text-gray-500 text-sm">Gate Out</p>
            <h2 className="text-3xl font-bold mt-2">66</h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-5">
            <p className="text-gray-500 text-sm">Active Customers</p>
            <h2 className="text-3xl font-bold mt-2">21</h2>
          </div>

        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-6">
            New Container Movement Entry
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <input className="border rounded-xl p-3" placeholder="Customer Name" />
            <input className="border rounded-xl p-3" placeholder="Customer Reference No" />
            <input className="border rounded-xl p-3" placeholder="Booking No" />

            <input type="date" className="border rounded-xl p-3" />
            <input type="time" className="border rounded-xl p-3" />
            <input className="border rounded-xl p-3" placeholder="Door No" />

            <input className="border rounded-xl p-3" placeholder="Container No / Cargo Detail" />
            <input className="border rounded-xl p-3" placeholder="Shipping Line" />

            <select className="border rounded-xl p-3">
              <option>Container Size</option>
              <option>20FT</option>
              <option>40FT</option>
              <option>45FT</option>
            </select>

            <select className="border rounded-xl p-3">
              <option>Container Type</option>
              <option>DRY</option>
              <option>REEFER</option>
              <option>OPEN TOP</option>
              <option>FLAT RACK</option>
              <option>TANK</option>
            </select>

            <select className="border rounded-xl p-3">
              <option>FULL / EMPTY</option>
              <option>FULL</option>
              <option>EMPTY</option>
            </select>

            <input className="border rounded-xl p-3" placeholder="From" />
            <input className="border rounded-xl p-3" placeholder="To" />
            <input className="border rounded-xl p-3" placeholder="KM" />

            <select className="border rounded-xl p-3">
              <option>Gate Information</option>
              <option>Gate In</option>
              <option>Gate Out</option>
            </select>

            <textarea
              className="border rounded-xl p-3 md:col-span-2"
              placeholder="Remarks"
            />

          </div>

          <div className="mt-6 flex gap-4 flex-wrap">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl shadow">
              Save Entry
            </button>

            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl shadow">
              Export Excel
            </button>

            <button className="bg-slate-700 hover:bg-slate-800 text-white px-6 py-3 rounded-2xl shadow">
              Generate Report
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6 overflow-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h2 className="text-2xl font-semibold">
              Live Movement Records
            </h2>

            <div className="flex gap-3 flex-wrap">
              <input
                className="border rounded-xl px-4 py-2"
                placeholder="Search Container No"
              />

              <input
                className="border rounded-xl px-4 py-2"
                placeholder="Search Customer"
              />
            </div>
          </div>

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
              </tr>
            </thead>

            <tbody>
              {entries.map((item, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-slate-50"
                >
                  <td className="p-3">{item.date}</td>
                  <td className="p-3">{item.time}</td>
                  <td className="p-3">{item.customer}</td>
                  <td className="p-3 font-medium">{item.container}</td>
                  <td className="p-3">{item.from}</td>
                  <td className="p-3">{item.to}</td>
                  <td className="p-3">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                      {item.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      {item.type}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">
            System Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <div className="border rounded-2xl p-4">
              <h3 className="font-semibold text-lg mb-2">
                Multi User Access
              </h3>
              <p className="text-gray-500 text-sm">
                Multiple staff can create entries simultaneously.
              </p>
            </div>

            <div className="border rounded-2xl p-4">
              <h3 className="font-semibold text-lg mb-2">
                Excel Export
              </h3>
              <p className="text-gray-500 text-sm">
                Export all records instantly to Excel reports.
              </p>
            </div>

            <div className="border rounded-2xl p-4">
              <h3 className="font-semibold text-lg mb-2">
                Live Dashboard
              </h3>
              <p className="text-gray-500 text-sm">
                Real-time tracking of all container movements.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
