import clsx from 'clsx'
import { useState } from 'react'
import RightClick from './RightClick'

export default function Message({ isMe = true }: { isMe: boolean }) {
	const [toolsPosition, setToolsPosition] = useState<{ x: number; y: number } | null>(null)

	function handleContextMenu(e: React.MouseEvent) {
		e.preventDefault()
		e.stopPropagation()
		setToolsPosition({ x: e.clientX, y: e.clientY })
	}

	return (
		<div
			className={clsx(isMe ? 'justify-end' : 'justify-start', 'w-full flex message')}
			onContextMenu={handleContextMenu}
		>
			{toolsPosition && (
				<RightClick
					position={toolsPosition}
					onClose={() => setToolsPosition(null)}
				/>
			)}
			<div className='max-w-[70%] flex relative gap-2'>
				{!isMe && (
					<div
						className={`sticky bottom-0 self-end w-10 h-10 rounded-[50%] text-white flex justify-center items-center border-2 border-gray-700 shrink-0`.trim()}
					>
						PFP
						<div className='w-3 h-3 bg-green-500 border border-white rounded-[50%] absolute right-0 top-[68%]' />
					</div>
				)}
				<div className='flex-1 flex flex-col'>
					<p
						className={clsx(
							isMe ? 'rounded-br-sm myMessage' : 'rounded-bl-sm bg-[#1E1E26]',
							'font-inter px-3.5 py-2 rounded-2xl text-sm  leading-relaxed',
						)}
					>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem iusto,
						soluta nobis ipsa corporis odit suscipit incidunt consequuntur
						reiciendis sunt necessitatibus fugit ut earum officiis beatae ex
						sequi deserunt quos error veritatis non! Pariatur eius ducimus
						quibusdam, vero nisi, corrupti, officia odit doloribus aperiam porro
						quidem itaque distinctio et modi cumque voluptas. Rerum illum non
						tempore voluptas quisquam iusto, commodi cum, quod asperiores
						placeat et ipsum amet soluta atque. Quibusdam aspernatur quasi iste
						veniam, earum placeat modi architecto dolorem quod doloremque
						necessitatibus quae incidunt voluptatem possimus cum et quo eius
						rerum minus beatae tempora iusto esse! Inventore id maxime esse
						earum nostrum placeat provident eos voluptatem dolor iusto, quos
						minus molestias quis tenetur saepe facilis blanditiis tempora quas
						vitae? Iste perferendis ducimus rem accusantium voluptate quibusdam
						magni exercitationem ab libero porro maiores totam expedita
						obcaecati, magnam, ipsa possimus quos ex. Quam voluptatum cumque
						maxime veritatis hic officiis et a, explicabo quae porro assumenda
						quaerat molestiae animi odit soluta tenetur beatae eos at nisi
						repellendus veniam voluptatibus! Laudantium praesentium perferendis
						asperiores at officia aspernatur nihil enim vel velit sint accusamus
						eius minus officiis, totam nesciunt dolorum deleniti, ducimus
						excepturi sit iure accusantium. Voluptas, cumque a. Harum corporis
						quibusdam veritatis debitis soluta.
					</p>
					<p
						className={clsx(
							isMe ? 'self-end' : 'self-start',
							'text-[#6B6B80] text-[13px] font-mono ml-1',
						)}
					>
						When
					</p>
				</div>
			</div>
		</div>
	)
}
