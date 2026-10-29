import React, { useState } from 'react';
import { 
  BarChart3, 
  Package, 
  Truck, 
  Layers, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  RefreshCw, 
  ArrowUpRight,
  ShieldCheck,
  Building,
  Zap,
  DollarSign,
  X
} from 'lucide-react';
import { SCM_DATA, PRODUCTS } from '../../data/products';
import { useShop } from '../../context/ShopContext';

export default function SCMDashboard() {
  const { setIsAdminView } = useShop();
  const [activeTab, setActiveTab] = useState("overview"); // overview, orders, inventory, logistics
  const [orders, setOrders] = useState(SCM_DATA.liveOrders);
  const [inventoryList, setInventoryList] = useState(PRODUCTS);

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return { ...o, status: newStatus };
      }
      return o;
    }));
  };

  return (
    <div className="min-h-screen bg-[#070707] text-[#F7F7F7] p-4 md:p-8 animate-fadeIn">
      <div className="container mx-auto space-y-8 max-w-7xl">
        
        {/* Top Command Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B7FF00]/10 border border-[#B7FF00]/30 text-xs font-bold text-[#B7FF00]">
              <Zap className="w-3.5 h-3.5" />
              <span>ACADEMIC SCM & OPERATIONS COMMAND CENTER // FY26</span>
            </div>
            <h1 className="text-3xl font-black text-white font-heading">
              NOVA D2C Supply Chain Architecture
            </h1>
            <p className="text-xs text-zinc-400">
              Real-time monitoring of decentralized warehousing, 48H express logistics SLAs, and direct unit economics.
            </p>
          </div>

          <button
            onClick={() => setIsAdminView(false)}
            className="self-start md:self-auto px-5 py-2.5 rounded-xl bg-[#B7FF00] hover:bg-[#a6eb00] text-black font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all shadow-[0_0_20px_rgba(183,255,0,0.3)]"
          >
            <span>Exit to Customer Store</span>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Global SCM KPIs Ribbon */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-zinc-900/60 p-5 rounded-2xl border border-zinc-800 space-y-1">
            <div className="text-xs text-zinc-400 font-medium">Daily Direct Revenue</div>
            <div className="text-2xl font-black text-white font-heading">₹18,42,500</div>
            <div className="text-[11px] text-[#B7FF00] font-semibold flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>+24.6% vs target</span>
            </div>
          </div>

          <div className="bg-zinc-900/60 p-5 rounded-2xl border border-zinc-800 space-y-1">
            <div className="text-xs text-zinc-400 font-medium">48H SLA Delivery Rate</div>
            <div className="text-2xl font-black text-[#B7FF00] font-heading">97.4%</div>
            <div className="text-[11px] text-zinc-400 font-medium">National avg: 31.2h transit</div>
          </div>

          <div className="bg-zinc-900/60 p-5 rounded-2xl border border-zinc-800 space-y-1">
            <div className="text-xs text-zinc-400 font-medium">Decentralized Stock</div>
            <div className="text-2xl font-black text-white font-heading">4,820 Pairs</div>
            <div className="text-[11px] text-zinc-400 font-medium">Across 3 regional hubs</div>
          </div>

          <div className="bg-zinc-900/60 p-5 rounded-2xl border border-zinc-800 space-y-1">
            <div className="text-xs text-zinc-400 font-medium">D2C Return Ratio</div>
            <div className="text-2xl font-black text-white font-heading">4.8%</div>
            <div className="text-[11px] text-[#B7FF00] font-semibold">
              Industry benchmark: 18%
            </div>
          </div>
        </div>

        {/* SCM Module Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
          {[
            { id: "overview", label: "Fulfillment Hubs & Logistics", icon: Truck },
            { id: "orders", label: "Live Order Pipeline", icon: Package },
            { id: "inventory", label: "SKU Inventory Allocation", icon: Layers }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-zinc-800 text-[#B7FF00] border border-[#B7FF00]/40'
                  : 'bg-zinc-950 text-zinc-400 hover:text-white border border-transparent'
              }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab 1: Fulfillment Hubs & Logistics */}
        {activeTab === "overview" && (
          <div className="space-y-6 animate-fadeIn">
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {SCM_DATA.activeWarehouses.map((wh, idx) => (
                <div key={idx} className="bg-zinc-900/40 p-6 rounded-2xl border border-zinc-800 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-[#B7FF00] uppercase tracking-wider">
                        REGIONAL NODE 0{idx + 1}
                      </span>
                      <h3 className="text-base font-bold text-white font-heading mt-0.5">
                        {wh.city}
                      </h3>
                    </div>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#B7FF00] animate-ping" />
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between text-zinc-400">
                      <span>Warehouse Capacity:</span>
                      <span className="text-white font-bold">{wh.capacity}</span>
                    </div>
                    <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-[#B7FF00] rounded-full" style={{ width: wh.capacity }} />
                    </div>

                    <div className="flex justify-between text-zinc-400 pt-1">
                      <span>Avg Pick & Pack Time:</span>
                      <span className="text-white font-mono font-bold">{wh.avgShipTime}</span>
                    </div>

                    <div className="flex justify-between text-zinc-400">
                      <span>Fulfilled Today:</span>
                      <span className="text-[#B7FF00] font-mono font-bold">{wh.ordersFulfilledToday} units</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Courier Partner Split */}
            <div className="bg-zinc-900/40 p-6 rounded-2xl border border-zinc-800 space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-heading">
                Express Logistics Partners & SLA Compliance
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                {SCM_DATA.logisticsKPIs.activeCourierPartners.map((c, i) => (
                  <div key={i} className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 space-y-2">
                    <div className="font-bold text-white">{c.name}</div>
                    <div className="flex justify-between text-zinc-400">
                      <span>Volume Allocation:</span>
                      <span className="text-white font-bold">{c.share}</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>On-Time SLA Rate:</span>
                      <span className="text-[#B7FF00] font-bold font-mono">{c.onTime}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: Live Order Pipeline with Status Modifier */}
        {activeTab === "orders" && (
          <div className="bg-zinc-900/40 p-6 rounded-2xl border border-zinc-800 space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-heading">
                Active Order Fulfillment Pipeline
              </h3>
              <span className="text-xs text-zinc-400">Click any status pill to transition workflow stage</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-zinc-800 text-zinc-400 uppercase tracking-wider text-[10px]">
                    <th className="py-3">ORDER ID</th>
                    <th className="py-3">CUSTOMER</th>
                    <th className="py-3">DESTINATION</th>
                    <th className="py-3">PRODUCT</th>
                    <th className="py-3">AMOUNT</th>
                    <th className="py-3">LOGISTICS CARRIER</th>
                    <th className="py-3">WORKFLOW STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                  {orders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-zinc-900/50 transition-colors">
                      <td className="py-3 font-mono font-bold text-white">{ord.id}</td>
                      <td className="py-3 font-medium text-white">{ord.customer}</td>
                      <td className="py-3 text-zinc-400">{ord.city}</td>
                      <td className="py-3">{ord.product}</td>
                      <td className="py-3 font-mono font-bold text-white">₹{ord.amount}</td>
                      <td className="py-3 text-zinc-400">{ord.carrier}</td>
                      <td className="py-3">
                        <select
                          value={ord.status}
                          onChange={(e) => updateOrderStatus(ord.id, e.target.value)}
                          className="bg-zinc-950 border border-zinc-700 text-[#B7FF00] font-bold text-xs p-1.5 rounded-lg focus:outline-none cursor-pointer"
                        >
                          <option value="Order Placed">Order Placed</option>
                          <option value="Processing in Bhiwandi Hub">Processing in Hub</option>
                          <option value="Shipped">Air Cargo Shipped</option>
                          <option value="Out for Delivery">Out for Delivery</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Inventory SKU Allocation */}
        {activeTab === "inventory" && (
          <div className="bg-zinc-900/40 p-6 rounded-2xl border border-zinc-800 space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-heading">
                Decentralized Stock by Model & Category
              </h3>
              <span className="text-xs text-[#B7FF00] font-semibold">Dynamic Auto-Replenishment Active</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              {inventoryList.map((prod) => (
                <div key={prod.id} className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 space-y-2">
                  <div className="flex items-center gap-3">
                    <img src={prod.colors[0].heroImage} alt={prod.name} className="w-12 h-12 object-contain bg-zinc-900 rounded-lg p-1" />
                    <div>
                      <div className="font-bold text-white">{prod.name}</div>
                      <div className="text-[10px] text-zinc-500 font-mono">{prod.sku}</div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-zinc-800/80 flex justify-between text-zinc-400">
                    <span>Stock Left:</span>
                    <span className="font-bold font-mono text-white">{prod.inventoryCount} pairs</span>
                  </div>

                  <div className="flex justify-between text-zinc-400">
                    <span>Restock SLA:</span>
                    <span className="text-[#B7FF00] font-bold">5 Days</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
