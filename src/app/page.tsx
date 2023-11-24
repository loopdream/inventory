'use client';

import { useEffect, useState } from 'react';

import inventory, { InventoryItem } from './inventory';

export default function Home() {
  const [inventoryItems, setInventoryItems] =
    useState<InventoryItem[]>(inventory);

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterBy, setFilter] = useState<'all' | 'sold' | 'notSold'>('all');
  const [editItem, setEditItem] = useState<number | undefined>(undefined);

  useEffect(() => {
    const savedInventory = JSON.parse(
      localStorage.getItem('inventory') || JSON.stringify(inventory)
    );
    setInventoryItems(savedInventory);
  }, []);

  const onEditHandler = (index?: number) => {
    setEditItem(index ?? undefined);
  };

  const onRefundHandler = (index: number) => {
    const updatedInventoryItems = inventoryItems.map((i: InventoryItem) => {
      if (i.description === inventoryItems[index].description) {
        return { ...i, soldForPrice: null };
      }
      return i;
    });

    setInventoryItems(updatedInventoryItems);
    localStorage.setItem('inventory', JSON.stringify(updatedInventoryItems));
  };

  const onFormSubmit = (e: any, item: InventoryItem) => {
    e.preventDefault();
    const soldForPrice = e.target[0].value;
    console.log(soldForPrice);
    const updatedInventoryItems = inventoryItems.map((i: InventoryItem) => {
      if (i.description === item.description) {
        return { ...i, soldForPrice };
      }
      return i;
    });

    setInventoryItems(updatedInventoryItems);
    setEditItem(undefined);
    localStorage.setItem('inventory', JSON.stringify(updatedInventoryItems));
  };

  const getNumItemsSold = () => {
    const soldItems = inventoryItems.filter(
      (item: InventoryItem) => item.soldForPrice && item.soldForPrice > 0
    );
    return soldItems.length;
  };

  const getPojectedEarnings = () => {
    return inventoryItems.reduce((acc, item) => acc + item.price, 0);
  };

  const getActualEarnings = () => {
    const soldItems = inventoryItems.filter(
      (item: InventoryItem) => item.soldForPrice && item.soldForPrice > 0
    );
    return soldItems.reduce((acc, { soldForPrice }) => {
      if (soldForPrice === null) return acc;
      const soldPrice =
        typeof soldForPrice === 'string'
          ? parseInt(soldForPrice)
          : soldForPrice;
      return acc + soldPrice;
    }, 0);
  };

  const clearLocalStorage = () => {
    if (
      confirm(
        'Are you sure you want to reset the inventory?! This will clear all sold prices and reset the inventory to the default items.'
      )
    ) {
      if (confirm('ARE YOU SURE YOU ARE SURE?!!')) {
        localStorage.removeItem('inventory');
        setInventoryItems(inventory);
      }
    }
  };

  const getProfit = () => {
    const soldItems = inventoryItems.filter(
      (item: InventoryItem) => item.soldForPrice && item.soldForPrice > 0
    );
    return soldItems.reduce((acc, { soldForPrice, price }) => {
      if (soldForPrice === null) return acc;
      const soldPrice =
        typeof soldForPrice === 'string'
          ? parseInt(soldForPrice)
          : soldForPrice;
      return acc + (soldPrice - price);
    }, 0);
  };

  const activeBtnStyle = 'bg-indigo-700 text-white';

  const sortedItems =
    filterBy === 'sold'
      ? inventoryItems.filter(
          (item: InventoryItem) => item.soldForPrice && item.soldForPrice > 0
        )
      : filterBy === 'notSold'
        ? inventoryItems.filter(
            (item: InventoryItem) =>
              !item.soldForPrice || item.soldForPrice === 0
          )
        : inventoryItems;

  const list = sortedItems.filter((item: InventoryItem) =>
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="flex flex-col items-center justify-between bg-white">
      <div className="min-w-full p-3  divide-y divide-gray-300">
        <h1 className="font-bold mb-2">Inventory</h1>
        <p className="pt-3">
          <span className="font-semibold">Total items:</span> {inventory.length}
          <br />
          <span className="font-semibold">Items sold:</span> {getNumItemsSold()}
          <br />
          <span className="font-semibold">Projected earnings:</span> £
          {getPojectedEarnings()}
          <br />
          <span className="font-semibold">Actual earnings:</span> £
          {getActualEarnings()}
          <br />
          <span className="font-semibold">Profit:</span> £{getProfit()}
        </p>
      </div>

      <div className="py-2 px-3 flex min-w-full">
        <input
          type="text"
          className=" inline-block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 w-200 mb-1"
          placeholder="Search for an item"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className=" px-2 py-1 text-sm font-semibold text-indigo-600 ml-3"
          type="button"
          onClick={() => setSearchTerm('')}
        >
          Clear
        </button>
      </div>

      <div className="isolate inline-flex rounded-md min-w-full p-3">
        <button
          type="button"
          className={`relative inline-flex items-center rounded-l-md  px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-10 w-1/3 ${
            filterBy === 'all'
              ? `bg-indigo-600 text-white`
              : 'bg-white text-gray-900'
          }`}
          onClick={() => setFilter('all')}
          disabled={filterBy === 'all'}
        >
          All
        </button>
        <button
          type="button"
          className={`relative -ml-px inline-flex items-center  px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300  focus:z-10 w-1/3 ${
            filterBy === 'sold'
              ? `bg-indigo-600 text-white`
              : 'bg-white text-gray-900'
          }`}
          onClick={() => setFilter('sold')}
          disabled={filterBy === 'sold'}
        >
          Sold
        </button>
        <button
          type="button"
          className={`relative -ml-px inline-flex items-center rounded-r-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-10  w-1/3  ${
            filterBy === 'notSold'
              ? `bg-indigo-600 text-white`
              : 'bg-white text-gray-900'
          }`}
          onClick={() => setFilter('notSold')}
          disabled={filterBy === 'notSold'}
        >
          Not sold
        </button>
      </div>
      <table className="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 w-2/5"
            >
              Description
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900  w-1/5"
            >
              Price
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 w-2/5"
            >
              Sold Price
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {list.length === 0 && (
            <tr>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500  w-2/5">
                No items found
              </td>
            </tr>
          )}
          {list.length > 0 &&
            list.map((item, index) => (
              <tr key={item.description.split('').join('-')}>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500  w-2/5">
                  {item.description}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 w-1/5 font-semibold">
                  £{item.price}
                </td>

                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 w-2/5 ">
                  {item.soldForPrice && editItem !== index ? (
                    <>
                      <span className="font-semibold">
                        £{item.soldForPrice}
                      </span>{' '}
                      <button
                        className="rounded bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ml-3"
                        type="button"
                        onClick={() => onEditHandler(index)}
                      >
                        Edit
                      </button>{' '}
                      <button
                        className="rounded bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ml-1"
                        type="button"
                        onClick={() => onRefundHandler(index)}
                      >
                        Refund
                      </button>{' '}
                    </>
                  ) : (
                    <form onSubmit={(e) => onFormSubmit(e, item)}>
                      <input
                        type="number"
                        className=" inline-block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 w-200 mb-1"
                        placeholder={
                          item.soldForPrice !== null
                            ? `£${item.soldForPrice}`
                            : '£'
                        }
                      />
                      <br />
                      <button
                        className="rounded bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mr-1"
                        type="submit"
                      >
                        Submit
                      </button>
                      {item.soldForPrice && (
                        <button
                          className="rounded bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mr-1"
                          type="button"
                          onClick={() => onEditHandler()}
                        >
                          Cancel
                        </button>
                      )}
                    </form>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <button
        className="rounded bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-10"
        type="button"
        onClick={() => clearLocalStorage()}
      >
        Reset Inventory
      </button>
    </main>
  );
}
