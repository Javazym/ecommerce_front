import { reactive, computed } from 'vue'
import { ElMessage } from 'element-plus'
import {
    getAddressList,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress
} from '../api/modules/address.js'

const state = reactive({
    addresses: [],
    loading: false
})

// 获取默认地址
const defaultAddress = computed(() => {
    return state.addresses.find(addr => addr.isDefault === 1)
})

// 加载地址列表
async function fetchAddresses() {
    state.loading = true
    try {
        const res = await getAddressList()
        state.addresses = res.data || []
    } finally {
        state.loading = false
    }
}

// 添加地址
async function addAddressData(data) {
    try {
        await addAddress(data)
        ElMessage.success('添加成功')
        return true
    } catch (e) {
        ElMessage.error('添加失败')
        return false
    }
}

// 更新地址
async function updateAddressData(data) {
    try {
        await updateAddress(data)
        ElMessage.success('更新成功')
        return true
    } catch (e) {
        ElMessage.error('更新失败')
        return false
    }
}

// 删除地址
async function deleteAddressData(id) {
    try {
        await deleteAddress(id)
        ElMessage.success('删除成功')
        return true
    } catch (e) {
        ElMessage.error('删除失败')
        return false
    }
}

// 设置默认地址
async function setDefaultAddressData(id) {
    try {
        await setDefaultAddress(id)
        ElMessage.success('默认设置成功')
        return true
    } catch (e) {
        ElMessage.error('设置失败')
        return false
    }
}

// 清除地址数据
function clearAddresses() {
    state.addresses = []
}

export {
    state,
    defaultAddress,
    fetchAddresses,
    addAddressData,
    updateAddressData,
    deleteAddressData,
    setDefaultAddressData,
    clearAddresses
}

export default {
    state,
    defaultAddress,
    fetchAddresses,
    addAddressData,
    updateAddressData,
    deleteAddressData,
    setDefaultAddressData
}
