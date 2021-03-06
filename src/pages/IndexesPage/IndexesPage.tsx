import React, { useEffect, useState } from 'react'
import { IndexesBox } from '../../components/componentsPage/IndexesBox'
import { ICaContract,  IGroupsId } from '../../types'
import { Loader } from '../../components/componentsUI/Loader'
import './IndexesPage.scss'

interface IIndexesPage{
  caContract: ICaContract
}

export const IndexesPage: React.FC<IIndexesPage> = ({caContract}) => {
  const [groupIds, setGroupIds] = useState<string[]>([])
  const [groups, setGroups] = useState<IGroupsId[]>([])

  useEffect(() => {
    if (caContract) getGroupsIds()
    // eslint-disable-next-line
  }, [caContract])

  useEffect(() => {
    if (groupIds) getGroup()
    // eslint-disable-next-line
  }, [groupIds])

  const getGroupsIds = async () => {
    if(caContract){ 
      try {
        await caContract.methods.getGroupIds().call().then((groupsIds:string[]) => setGroupIds(groupsIds))
      } catch (error) {
        throw new Error('get group ids Error')
      }
    }
  }

  const getGroup = async () => {
    if(groupIds.length){
      try {
        const groupsArr:IGroupsId[] = []
        for(const groupId of groupIds){
          await caContract.methods.getGroup(groupId).call().then((groupId:IGroupsId) => groupsArr.push({...groupId}))
        }
        setGroups(groupsArr);
      } catch (error) {
         throw new Error('get groups Error')
      }
    }
  }

  return (
    <div className='indexesPage'>
      <h1 className='indexesPage__title'>All Indexes</h1>
      {groups.length
        ? groups.map((group:IGroupsId) => <IndexesBox key={group.name} titleName={group.name} indexes={group.indexes}/>)
        :  <Loader/>   
      }
    </div>
  )
}